const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

const multer = require("multer");
const QRCode = require("qrcode");
const fs = require("fs");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rb",
});

con.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL database");
});

// Login API
app.post("/api/loginprocess", (req, resp) => {
    const { Owner_email, Owner_pass } = req.body;
    const query = "SELECT * FROM owner WHERE Owner_email=? AND Owner_pass=?";
    con.query(query, [Owner_email, Owner_pass], (err, result) => {
        if (err) return resp.status(500).send({ message: "Database query error" });
        if (result.length > 0) {
            resp.send(result);
        } else {
            resp.send({ message: "Invalid Email or Password" });
        }
    });
});

// Add Category API
app.post("/api/Categoryprocess", (req, resp) => {
    const { Category_name, Description } = req.body;
    const query = "INSERT INTO category (Category_name, Description) VALUES (?, ?)";
    con.query(query, [Category_name, Description], (err, result) => {
        if (err) return resp.status(500).send({ message: "Error inserting data" });
        resp.send({ message: "Category added successfully", result });
    });
});

// Get Categories API
app.get("/api/getcategory", (req, resp) => {
    const query = "SELECT * FROM category";
    con.query(query, (err, result) => {
        if (err) return resp.status(500).send({ message: "Error fetching categories" });
        resp.send(result);
    });
});

// Delete Category API
app.delete("/api/Category_Delete/:Category_id", (req, resp) => {
    const { Category_id } = req.params;
    const query = "DELETE FROM category WHERE Category_id=?";
    con.query(query, [Category_id], (err, result) => {
        if (err) return resp.status(500).send({ message: "Error deleting category" });
        if (result.affectedRows === 0) {
            return resp.status(404).json({ message: "Category not found" }
            );
        }
        resp.json({ message: "Category deleted successfully" });
    });
});

// Get Category by ID (Edit)
app.post("/api/Editcategorydata", (req, resp) => {
    const { Category_id } = req.body;
    const query = "SELECT * FROM category WHERE Category_id = ?";
    con.query(query, [Category_id], (err, result) => {
        if (err) return resp.status(500).send({ error: "Error fetching data" });
        if (result.length === 0) {
            return resp.status(404).json({ message: "Category not found" });
        }
        resp.send(result[0]);
    });
});

// Update Category API
app.post("/api/Categoryupdate", (req, res) => {
    const { Category_id, Category_Name, PDescription } = req.body;8
    const query = "UPDATE category SET Category_Name = ?, PDescription = ? WHERE Category_id = ?";
    con.query(query, [Category_Name, PDescription, Category_id], (err, result) => {
        if (err) return res.status(500).send({ error: "Error updating data" });
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "No data found for the provided ID" });
        }
        res.send({ message: "Category updated successfully" });
    });
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: path.join(__dirname, "./public/"),
    filename: function (req, file, callback) {
        const filename = Date.now() + path.extname(file.originalname);
        callback(null, filename);
    },
});
const upload = multer({ storage });
const multi = upload.fields([{ name: "Image" }]);

// Insert Product API with QR Code Generation
app.post("/api/insertproduct", multi, (req, resp) => {
    if (!req.files || !req.files.Image) {
        return resp.status(400).send({ message: "No file uploaded" });
    }

    const { Product_Name, Category_id, Price, PDescription,PQuantity } = req.body;
    const Image = req.files.Image[0].filename;
    //console.log(Product_Name);


    

    // Save QR code inside 'public/qrcodes'
    const qrCodeDir = path.join(__dirname, "public", "qrcodes");
    if (!fs.existsSync(qrCodeDir)) {
        fs.mkdirSync(qrCodeDir, { recursive: true });
    }

    const timestamp = Date.now();
    const qrCodeFilename = `${timestamp}-qrcode.png`;
    const qrCodePath = path.join(qrCodeDir, qrCodeFilename);
    const qrCodeUrl = `/qrcodes/${qrCodeFilename}`;

        // Insert into database
        const query = "INSERT INTO menu(Product_Name,Category_id,Price,PQuantity,Image,PDecription,QRimage) VALUES (?, ?, ?, ?, ?, ?,?)";
        con.query(query, [Product_Name, Category_id, Price,PQuantity, Image, PDescription, qrCodeUrl], (err, result) => {
            
            if (err) {
                resp.status(500).send({ message: "Error inserting product", error: err });
            } else {
                resp.send({ message: "Product inserted successfully", result });
            }
            
        });
    });



// Edit menu

app.post('/api/Editmenudata',(req,res) => {
    const Menu_id = req.body.Menu_id;
    // console.log(Menu_id);
    const query ="SELECT * FROM menu WHERE Menu_id = ?";

    con.query(query,[Menu_id],(err,result) => {
        if(err){
            return res.status(500).send({error:'Error to fetch data'});
        }

        if(result.length === 0){
            return res.status(404).send({message:'menu not found'});
        }

        res.send(result[0]);
    
        });
});
 app.get("/api/editmenu", (req,resp) => {
    const ins = "SELECT * FROM category";
   con.query(ins,(err,result)=>{
       resp.send(result);
   });
 });

 app.post('/api/update_product', multi, (req, res) => {
    const { Menu_id, Category_id, Product_Name, Price, PDecription, PQuantity } = req.body;
    let Image = null;
    
    // If an image is uploaded, assign the image filename
    if (req.files && req.files.Image) {
        Image = req.files.Image[0].filename;
    }

    let query, params;

    // Construct the query based on whether there's an image or not
    if (Image) {
        query = "UPDATE menu SET Product_Name = ?, Category_id = ?, Price = ?, image = ?, PDecription = ?, PQuantity = ? WHERE Menu_id = ?";
        params = [Product_Name, Category_id, Price, Image, PDecription, PQuantity, Menu_id];
    } else {
        query = "UPDATE menu SET Product_Name = ?, Category_id = ?, Price = ?, PDecription = ?, PQuantity = ? WHERE Menu_id = ?";
        params = [Product_Name, Category_id, Price, PDecription, PQuantity, Menu_id];
    }

    // Execute the query
    con.query(query, params, (err, result) => {
        if (err) {
            console.error("Error updating menu:", err);
            res.status(500).send({ message: `Error updating menu data: ${err.message}` });
        } else {
            res.send({ message: "Menu updated successfully", result });
        }
    });
});



//Add Table
app.post("/api/addtable", (req, resp) => {
    var table_no = req.body.table_no;
    var seating_capacity = req.body.seating_capacity;

    if (!table_no || !seating_capacity) {
        return resp.status(400).send({ message: "All fields are required" });
    }

    const qrData = `http://localhost:3001/?table=${table_no}`;
    

    const qrFileName = `table_${table_no}.png`;
    const qrFilePath = path.join(__dirname, "public", "qrcodes", qrFileName);

    // Generate and save QR code
    QRCode.toFile(qrFilePath, qrData, (err) => {
        if (err) {
            console.error("QR Code Error: ", err);
            return resp.status(500).send({ message: "Error generating QR code" });
        }

        const query =
            "INSERT INTO customer_table (table_no, seating_capacity, QRCode) VALUES (?, ?, ?)";
        con.query(query, [table_no, seating_capacity, `qrcodes/${qrFileName}`], (err, result) => {
            if (err) {
                console.error("SQL Error: ", err);
                return resp.send({ message: "Error inserting data" });
            }
            resp.send({ message: "Table added successfully with QR code" });
        });
    });
});

// Menu Grid

app.get("/api/getproduct",(req,resp)=>{
    const query="select a.*,b.* from category as a,menu as b where a.Category_id = b.Category_id";
    con.query(query,(err,result)=>{
        resp.send(result);
    });
});

// view table

app.get("/api/gettable", (req, resp) => {
    const query = "SELECT * FROM customer_table";
    con.query(query, (err, result) => {
        if (err) return resp.status(500).send({ message: "Error fetching table" });
        resp.send(result);
    });
});

// Product Delete

app.delete('/api/Product_Delete/:Menu_id', (req, resp) => {
    const { Menu_id } = req.params;
    const query = "DELETE FROM menu WHERE Menu_id = ?";
    con.query(query, [Menu_id], (err, result) => {
        if (result.affectedRows === 0) {
            return resp.status(404).json({ message: 'Product not found' });
        }
        resp.status(200).json({ message: 'Product deleted successfully' });
    });
});

//change password 
app.post("/api/Changepassprocess",(req,resp)=>{
    const {Owner_email,currentPassword,NewPassword}= req.body;
    if(!Owner_email || !currentPassword || !NewPassword) {
        return resp.status(400).send({message: "All fields are required"});
    }

    const query ="SELECT* FROM Owner WHERE Owner_email =?";
    con.query(query,[Owner_email], (err, result)=>{
        if(err) {
            return resp.status(500).send({message:"Error checking the user"});
        }

        if(result.length === 0){
            return resp.status(404).send({message:"User not found"});
        }

        const user=result[0];
        if(user.Owner_pass !== currentPassword){
            return resp.status(400).send({message:"Current password is incorrent"});
        }

        const updateQuery = "UPDATE Owner SET Owner_pass = ? WHERE Owner_email = ?";
        con.query(updateQuery, [NewPassword, Owner_email], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating the password:", updateErr); // Log the error
                return resp.status(500).send({ message: "Error updating the password", error: updateErr });
            }
            resp.send({ message: "Password changed successfully" });
        });        
    });
});


// Edit Table

app.post("/api/Editabledata", (req, resp) => {
    const { table_id } = req.body;
    const query = "SELECT * FROM customer_table WHERE table_id = ?";
    con.query(query, [table_id], (err, result) => {
        if (err) return resp.status(500).send({ error: "Error fetching data" });
        if (result.length === 0) {
            return resp.status(404).json({ message: "Table not found" });
        }
        resp.send(result[0]);
    });
});
app.post("/api/tableupdate", (req, res) => {
    const { table_id, table_no, seating_capacity } = req.body;8
    const query = "UPDATE customer_table SET table_no = ?, seating_capacity = ? WHERE table_id = ?";
    con.query(query, [table_no, seating_capacity, table_id], (err, result) => {
        if (err) return res.status(500).send({ error: "Error updating data" });
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "No data found for the provided ID" });
        }
        res.send({ message: "Table updated successfully" });
    });
});


// Delete Table

app.delete("/api/table_Delete/:table_id", (req, resp) => {
    const { table_id } = req.params;
    const query = "DELETE FROM customer_table WHERE table_id=?";
    con.query(query, [table_id], (err, result) => {
        if (err) return resp.status(500).send({ message: "Error deleting category" });
        if (result.affectedRows === 0) {
            return resp.status(404).json({ message: "Category not found" }
            );
        }
        resp.json({ message: "Table deleted successfully" });
    });
});


app.get("/api/getproducts", (req, resp) => {
    const categoryId = req.query.categoryId;

    // Define the SQL query
    let sql = 'SELECT a.*, b.* FROM category AS a JOIN menu AS b ON a.Category_id = b.Category_id';
    
    // If categoryId is provided, filter based on categoryId
    if (categoryId) {
        sql += ' WHERE a.Category_id = ?';
    }

    // Execute the query
    con.query(sql, [categoryId], (err, result) => {
        if (err) {
            // Handle error and send response
            console.error(err);
            resp.status(500).send({ error: 'Database query failed' });
            return;
        }

        // Send the result back
        resp.send(result);
    });
});


// //user side
 app.get("/api/getproductlist",(req,resp)=>{
     const query="SELECT * FROM category";
    con.query(query,(err,result)=>{
         resp.send(result);
     });
 });


 app.post("/api/Editcategorydatafetch", (req, resp) => {
    const { Category_id } = req.body;
    const query = "SELECT * FROM menu WHERE Category_id = ?";
    con.query(query, [Category_id], (err, result) => {
        if (err) return resp.status(500).send({ error: "Error fetching data" });
        if (result.length === 0) {
            return resp.status(404).json({ message: "Category not found" });
        }
        resp.send(result);
    });
});



// user side cart page api
app.post("/api/addtocart", (req, res) => {

    const { Menu_id, table_no } = req.body;
    const PQuantity = 1;

    if (!Menu_id || !table_no) {
        return res.status(400).send({ message: "Menu_id or table_no is missing" });
    }

    const checkQuery = "SELECT * FROM cart WHERE Menu_id = ? AND table_no = ?";
    con.query(checkQuery, [Menu_id, table_no], (err, results) => {
        if (err) {
            console.error("Error in checkQuery:", err); 
            return res.status(500).send({ message: "Error checking cart" });
        }

        if (results.length > 0) {
            return res.send({ message: "Product already added for this table" });
        }

        const insertQuery = "INSERT INTO cart(Menu_id, PQuantity, table_no) VALUES (?, ?, ?)";
        con.query(insertQuery, [Menu_id, PQuantity, table_no], (err, result) => {
            if (err) {
                console.error("Error in insertQuery:", err); 
                return res.status(500).send({ message: "Error adding product to cart" });
            }

            res.send({ message: "Product added to the cart", data: result });
        });
    });
});


// Show Cart


app.post('/api/showcart', (req, res) => {
    const table_no = req.body.table_no;
    // console.log("Received Table_no:", Table_no);

    if (!table_no) {
        return res.status(400).send({ message: "table_no is missing from request body" });
    }

    const query = `select a.*,b.Product_Name,b.Image,b.Price from cart as a,menu as b where a.Menu_id = b.Menu_id and a.table_no=?`;

    con.query(query, [table_no], (err, results) => {
        if (err) {
            console.error("MySQL Query Error:", err);
            return res.status(500).send({ message: "Error fetching cart data", error: err });
        }

        // console.log("Query Results:", results);
        res.send(results);
    });
});



// Update product quantity in cart
app.post('/api/updateQuantity', (req, res) => {
    const { Menu_id, table_no, PQuantity } = req.body;

    const updateQuery = `UPDATE cart SET PQuantity = ? WHERE Menu_id = ? AND table_no = ?`;

    con.query(updateQuery, [PQuantity, Menu_id, table_no], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Error updating product quantity" });
        }
        res.send({ message: "Product quantity updated successfully" });
    });
});




app.post('/api/pay', (req, res) => {
    const table_no = req.body.table_no;
    const Total = req.body.Total;
    const Order_no = 'order' + uuidv4().split('-').pop();

    const checkquery = "SELECT * FROM Cart WHERE table_no=?";
    con.query(checkquery, [table_no], (checkError, cartItems) => {
        if (checkError) {
            console.error("Error fetching cart items:", checkError);
            return res.status(500).send({ message: "Error fetching cart items" });
        }

        if (cartItems.length === 0) {
            return res.status(400).send({ message: "Cart is empty" });
        }

        // Step 1: Insert all cart items into order
        const insertPromises = cartItems.map(item => {
            return new Promise((resolve, reject) => {
                const ins = "INSERT INTO tbl_order(Order_no, table_no, Menu_id, quantity, total_amount) VALUES (?, ?, ?, ?, ?)";
                con.query(ins, [Order_no, table_no, item.Menu_id, item.PQuantity,Total], (err, result) => {
                    if (err) {
                        console.error("Insert error:", err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });        

        // Step 2: Wait for all inserts, then delete cart
        Promise.all(insertPromises)
            .then(() => {
                const deleteQuery = "DELETE FROM Cart WHERE table_no=?";
                con.query(deleteQuery, [table_no], (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.error("Error deleting cart:", deleteErr);
                        return res.status(500).json({ message: "Error clearing cart" });
                    }

                    console.log("Cart items deleted successfully");
                    return res.send({ message: "Order placed and cart cleared successfully", Order_no });
                });
            })
            .catch(insertErr => {
                return res.status(500).send({ message: "Error inserting order data" });
            });
    });
});


//api for delete cart
app.delete("/api/Cart_Delete/:Cart_id", (req, resp) => {
    console.log('DELETE route hit for Cart_id:', req.params.Cart_id); // <-- Add this
    const { Cart_id } = req.params;
    const query = "DELETE FROM Cart WHERE Cart_id = ?";
    con.query(query, [Cart_id], (err, result) => {
        if (err) {
            console.error("DB error:", err); // Optional
            return resp.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return resp.status(404).json({ message: 'Product not found' });
        }
        resp.status(200).json({ message: 'Product deleted successfully' });
    });
});


//user review 
app.post("/api/review", (req, res) => {
    const { Full_Name, Email, Phone_No, Rating, Product_Name, Message, table_no } = req.body;
  
    const query = "INSERT INTO Review (Full_Name, Email, Phone_No, Rating, Product_Name, Message, table_no) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
    con.query(query, [Full_Name, Email, Phone_No, Rating, Product_Name, Message, table_no], (err, result) => {
        if (err) {
          console.error("Error saving Review:", err);
          console.log("Received Review Data:", req.body);
          return res.status(500).send({ message: "Error in Inserting data", error: err });
        }
        res.send({ success: true, message: "Review saved!" });
      });      
  });

  //for geting product name
  app.get("/api/getproduct",(req,resp)=>{
    const query="SELECT * FROM menu";
    con.query(query,(err,result)=>{
        resp.send(result);
    });
}); 


// Invoice 

app.get("/api/invoice/:Order_no", (req, res) => {
    const Order_no = req.params.Order_no;
    const sql = "SELECT o.Order_no, o.quantity, o.status, o.order_date, o.table_no, m.Product_Name, m.Price, m.PQuantity FROM tbl_order AS o JOIN menu AS m ON o.Menu_id = m.Menu_id WHERE o.order_no = ?;"   

  
    con.query(sql, [Order_no], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
});
});


//Dashboard 

app.get('/api/admin/summary', (req, res) => {
    const query = ` 
    SELECT 
      (SELECT COUNT(Menu_id) FROM menu) AS totalProducts,
      (SELECT COUNT(Category_id) FROM category) AS totalCategories,
      (SELECT COUNT(table_id) FROM customer_table) AS totalUsers,
      (SELECT COUNT(Review_id) FROM review) AS totalReview,
      (SELECT COUNT(DISTINCT Order_no) FROM tbl_order) AS totalOrders,
      (
        SELECT SUM(total_amount) 
        FROM (
          SELECT Order_no, MAX(total_amount) AS total_amount
          FROM tbl_order
          GROUP BY Order_no
        ) AS unique_orders
      ) AS totalSales
  `;
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching summary:", err);
      return res.status(500).json({ error: 'Error fetching summary' });
    }

    res.json(results[0]);
  });
});










// Server Setup
const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
