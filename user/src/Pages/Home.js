import React ,{useEffect,useState} from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function Home(){
    const [list, setlist] = useState([]);
    useEffect(() => {
      Axios.get('http://localhost:1337/api/getproduct')
        .then((response) => {
          setlist(response.data);
        });
    }, []); 

    const [table_no, setTableNumber] = useState(null); 
    const location = useLocation();

    useEffect(() => {
        // Get table number from URL
        const queryParams = new URLSearchParams(location.search);
        const tableNoFromUrl = queryParams.get("table");
        // alert(tableNoFromUrl);

        if (tableNoFromUrl) {
            // Save table number to localStorage
            localStorage.setItem("tableNumber", tableNoFromUrl);
            setTableNumber(tableNoFromUrl);
        } else {
            // Retrieve table number from localStorage if available
            const storedtableNo = localStorage.getItem("tableNumber");
            if (storedtableNo) {
                setTableNumber(storedtableNo);
            }
        }
    }, [location]);

    return(
        <>
        <div className="hero_area" style={{backgroundImage: 'url(images/hero-bg.jpg)'}}>
        <section className="slider_section ">
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>
                      Royal Bites Restaurant
                    </h1>
                    {/* <p>
                      Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                    </p> */}
                    <div className="btn-box">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>
                      Fast Food Restaurant
                    </h1>
                    {/* <p>
                      Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                    </p> */}
                    <div className="btn-box">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>
                      Testy Food Restaurant
                    </h1>
                    {/* <p>
                      Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                    </p> */}
                    <div className="btn-box">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ol className="carousel-indicators">
            <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
            <li data-target="#customCarousel1" data-slide-to="1"></li>
            <li data-target="#customCarousel1" data-slide-to="2"></li>
          </ol>
        </div>
      </div>

    </section>
    </div>

  <section className="offer_section layout_padding-bottom">
    <div className="offer_container">
      <div className="container">
        <div className="row">
          <div className="col-md-6  ">
            <div className="box ">
              <div className="img-box">
                <img src="images/o1.jpg" alt=""/>
              </div>
              <div className="detail-box">
                <h5>
                  Tasty Thursdays
                </h5>
                <h6>
                  <span>20%</span> Off
                </h6>
               
              </div>
            </div>
          </div>
          <div className="col-md-6  ">
            <div className="box ">
              <div className="img-box">
                <img src="images/o2.jpg" alt=""/>
              </div>
              <div className="detail-box">
                <h5>
                  Pizza Days
                </h5>
                <h6>
                  <span>15%</span> Off
                </h6>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section className="food_section layout_padding-bottom">
    <div className="container">
      <div className="heading_container heading_center">
        <h2>
          Our Menu
        </h2>
      </div>

      {/* <ul className="filters_menu">
        <li className="active" data-filter="*">All</li>
        <li data-filter=".burger">Burger</li>
        <li data-filter=".pizza">Pizza</li>
        <li data-filter=".pasta">Pasta</li>
        <li data-filter=".fries">Fries</li>
      </ul> */}

      <div className="filters-content">
        <div className="row grid">
        {list.map((val,index)=>(

          <div className="col-sm-6 col-lg-4 all pizza">
            <div className="box">
              <div>
                <div className="img-box">
                  <img src={`http://localhost:1337/${val.Image}`} alt=""/>
                </div>
                <div className="detail-box">
                  <h5>
                  {val.Product_Name}

                  </h5>
                  <p>
                  {val.PDecription}
                  </p>
                  <div className="options">
                    <h6>
                    {val.Price}

                    </h6>
                    <a href="">
                      
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <div className="btn-box">
        <a href="">
          View More
        </a>
      </div>
    </div>
  </section>

  <section className="about_section layout_padding">
    <div className="container  ">

      <div className="row">
        <div className="col-md-6 ">
          <div className="img-box">
            <img src="images/about-img.png" alt=""/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <div className="heading_container">
              <h2>
                We Are Royal Bites
              </h2>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
              the middle of text. All
            </p>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="book_section layout_padding">
    <div className="container">
      <div className="heading_container">
        <h2>
          Review
        </h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form_container">
            <form action="">
              <div>
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div>
                <input type="text" className="form-control" placeholder="Phone Number" />
              </div>
              <div>
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div>
                <select className="form-control nice-select wide">
                  <option value="" disabled selected>
                    How many persons?
                  </option>
                  <option value="">
                    1
                  </option>
                  <option value="">
                    2
                  </option>
                  <option value="">
                    3
                  </option>
                  <option value="">
                    4
                  </option>
                  <option value="">
                    5
                  </option>
                </select>
              </div>
              <div>
                <input type="date" className="form-control"/>
              </div>
              <div className="btn_box">
                <button>
                  Submit
                </button>
              </div>
            </form> 
          </div>
        </div>
        <div className="col-md-6">
          <div className="map_container ">
            <div id="googleMap"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <section className="client_section layout_padding-bottom">
    <div className="container">
      <div className="heading_container heading_center psudo_white_primary mb_45">
        <h2>
          What Says Our Customers
        </h2>
      </div>
      <div className="carousel-wrap row ">
        <div className="owl-carousel client_owl-carousel">
          <div className="item">
            <div className="box">
              <div className="detail-box">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <h6>
                  Moana Michell
                </h6>
                <p>
                  magna aliqua
                </p>
              </div>
              <div className="img-box">
                <img src="images/client1.jpg" alt="" className="box-img"/>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="box">
              <div className="detail-box">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <h6>
                  Mike Hamell
                </h6>
                <p>
                  magna aliqua
                </p>
              </div>
              <div className="img-box">
                <img src="images/client2.jpg" alt="" className="box-img"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}

        </>
    );
}
export default Home;