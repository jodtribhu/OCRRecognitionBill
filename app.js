const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const fileupload = require('express-fileupload');
const multer = require('multer');
const path = require('path');


/*defining the storage-engine */

const storage = multer.diskStorage({
  destination: __dirname + '/public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

/*init */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('billpics');

/*Checking File type */

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.json())
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "coupon",
  multipleStatements: true
});
connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Conection Failed");
  }
});


/*routes*/
app.get("/thankyou", function(req, res) {
  res.render("thankyou");
});
app.get("/", function(req, res) {

});

/*Test*/
app.get("/test", function(req, res) {
  var shopsql = "Select * from shops";
  connection.query(shopsql, function(error, results, fields) {
    if (error) throw error;
    if (results.length > 0) {
      var shops = results;
      console.log(results);
      res.render('test', {
        shops: shops
      });
    }
  });
});


app.post('/upload', function(req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send("File is undefined");
      } else {
        console.log(req.file);
        console.log(req.files);
        res.send("File is uploaded and niotanitsed" + req.file.path);
      }
    }
  });
});






app.post("/inserttest", function(req, res) {


  /*bill name*/
  var objcbillnames = JSON.parse(req.body.customerbillnames);
  var billnamearray = objcbillnames.tcustomerbillnames;
  /*bill No's*/
  var objcbillnumbers = JSON.parse(req.body.customerbillnumbers);
  var billnumbersarray = objcbillnumbers.tcustomerbillnumbers;
  /*bill Dates*/
  var objcbilldates = JSON.parse(req.body.customerbilldates);
  var billdatearray = objcbilldates.tcustomerbilldates;
  /*Shop Names*/
  var objcshopnames = JSON.parse(req.body.customershopnames);
  var cshoparray = objcshopnames.tcustomershopnames;
  /*Bill Amounts*/
  var objbillamounts = JSON.parse(req.body.customerbillamounts);
  var billamountarray = objbillamounts.tcustomerbillamounts;
  /*Bill Pics*/
  var objbillpics = JSON.parse(req.body.customerbillpics);
  var billpicarray = objbillpics.tcustomerbillpics;

  console.log("Testing0" + req.body.customerbillpics);
  console.log("Testing" + objbillpics);
  console.log("Testing2" + billpicarray[0].location);

  var lengthofarray = billpicarray.length;
  console.log(lengthofarray);
  var q = new Date();


  console.log(billnamearray);
  console.log(billnumbersarray);
  console.log(billdatearray);
  console.log(cshoparray);
  console.log(billamountarray);

  console.log(lengthofarray);

  res.send("thankyou");
  var i = 0;
  var j = 0;
  for (i = 0; i < lengthofarray; i++) {
    var particularbillname = billnamearray[i];
    var particularbillnumber = billnumbersarray[i];
    var particularbilldate = billdatearray[i];
    var particularshopname = cshoparray[i];
    var particularbillamount = billamountarray[i];
    // var particularbillpic = billpicarray[i];
    for (j = 0; j < lengthofarray; j++) {
      var v = i + 1;
      console.log("For LOop Comparison " + billpicarray[j].location);
      if (Object.values(billpicarray[j]).indexOf(v.toString()) > -1) {
        console.log("Inside Comparison " + billpicarray[j].location);
        var particularbillpic = billpicarray[j].location;
      }
    }


    console.log("<-------------------------------------------------------->");
    console.log(particularbillname);
    console.log(particularbillnumber);
    console.log(particularbilldate);
    console.log(particularshopname);
    console.log(particularbillamount);
    console.log(particularbillpic);
    finish(particularbillname, particularbillnumber, particularbilldate, particularshopname, particularbillamount, particularbillpic, q);
  }



  async function finish(particularbillname, particularbillnumber, particularbilldate, particularshopname, particularbillamount, particularbillpic, q) {
    var rt = await quickstart(particularbillname, particularbillnumber, particularbilldate, particularshopname, particularbillamount, particularbillpic);
    insertentry(particularbillnumber, particularbillname, particularbilldate, particularshopname, particularbillamount, particularbillpic, q, rt);
  }


  async function quickstart(particularbillname, particularbillnumber, particularbilldate, particularshopname, particularbillamount, particularbillpic) {
    var gcn = false;
    var gcb = false;
    var gbd = false;
    var gsn = false;
    var gba = false;
    let gdate = new Date(particularbilldate);
    let rating = 0;
    process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C:/Users/Jodiss Tribhu/Desktop/cloudkey/shopping-ocr-299706-4d669a3c6d92.json'
    const vision = require('@google-cloud/vision');
    try {
      const client = new vision.ImageAnnotatorClient();
      var filename = particularbillpic.replace(/^.*[\\\/]/, '')
      const [result] = await client.textDetection('public/uploads/' + filename);
      const detections = result.textAnnotations;
      console.log('Text:');
      detections.forEach(function(text) {
        if (text.description.includes(particularbillname) && gcn === false) {
          rating = rating + 1;
          gcn = true;
          console.log("<---------------------------------->cname");
        }
        if (text.description.includes(particularbillnumber) && gcb === false) {
          rating = rating + 1;
          gcb = true;
          console.log("<---------------------------------->cbno");
        }
        if (text.description.includes(gdate.toLocaleDateString()) && gbd === false) {
          rating = rating + 1;
          gbd = true;
          console.log("<---------------------------------->bdate");
        }
        if (text.description.includes(particularshopname) && gsn === false) {
          rating = rating + 1;
          gsn = true;
          console.log("<---------------------------------->sname");
        }
        if (text.description.includes(particularbillamount) && gba === false) {
          rating = rating + 1;
          gba = true;
          console.log("<---------------------------------->bamount");
        }

      });
    } catch (err) {
      console.log(err);
    }

    console.log("<----->rating= " + rating);
    return rating;
  }


  function insertentry(particularbillnumber, particularbillname, particularbilldate, particularshopname, particularbillamount, particularbillpic, q, rt) {
    console.log("<----->inserting ");
    console.log("Finished");
    connection.query('Insert into bill_details (customer_bill_no,customer_name,bill_date,shop_name,bill_amount,bill_image,bill_creation_time,bill_rating) values(?,?,?,?,?,?,?,?)', [particularbillnumber, particularbillname, particularbilldate, particularshopname, particularbillamount, particularbillpic, q, rt], function(error, results, fields) {
      console.log(error);
    });
  };



});


/* <----------------------------------------Test---------------------------------------------------------------------------->*/

app.get("/displaybilldetails", function(req, res) {
  let bid = req.query.bill_id;
  connection.query("Select * from bill_details where bill_id=?", [bid], function(error, results, fields) {
    if (error) throw error;
    let billdt = results;
    console.log(billdt.bill_id);
    res.render('bill_details', {
      bill_no: results[0].customer_bill_no,
      c_name: results[0].customer_name,
      b_date: results[0].bill_date,
      s_name: results[0].shop_name,
      b_amt: results[0].bill_amount,
      b_imgt: results[0].bill_image,
      b_rate: results[0].bill_rating
    });

  });
});

app.get("/getdata", function(req, res) {
  let bid = req.query.bill_id;
  connection.query("Select * from bill_details ORDER BY bill_creation_time ASC", function(error, results, fields) {
    if (error) throw error;
    let billdt = results;
    res.send(results);

  });
});

app.get('/displayallbills', function(req, res) {
  const regno = req.body.regno;

  var bill_sql = "Select * from bill_details ORDER BY bill_creation_time ASC;";

  connection.query(bill_sql, function(error, results, fields) {
    if (error) throw error;
    if (results.length > 0) {
      var bill_details = results;
      let tot_bills = results.length;
      res.render('datadisplay', {
        bill_details: bill_details,
        tot: tot_bills
      });
    } else {
      res.render('empty');
    }
  });
});

/* End Route */

app.listen(3000, function() {
  console.log('App listening on port 8080!')
});


/* For Ajax */
app.post("/checkcorrect", function(req, res) {
  var bno = req.body.Bill_Number;
  var sname = req.body.Shop_Name;
  connection.query('Select * from bill_details where customer_bill_no=? AND shop_name=?', [bno, sname], function(error, results, fields) {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      res.send("Exists");
    } else {
      res.send("Does not exists");
    }
  });
});
