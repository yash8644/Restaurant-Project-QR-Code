import React, { useEffect, useState } from 'react';
import Axios from "axios";
function Dashboard(){
  const usersession= sessionStorage.getItem("mydata");
  if(!usersession){
    window.location = "/";
  }


  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalSales:0,
    totalReview:0,
});

useEffect(() => {

    const fetchSummary = () => {
        Axios.get('http://localhost:1337/api/admin/summary')
            .then((res) => {
                setSummary(res.data);
            })
    };

    fetchSummary();
}, []);


    return (  
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              Dashboard
            </h3>
          </div>
          <div className="row grid-margin custom-margin">
            <div className="col-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="d-flex flex-column flex-md-row custom-margin align-items-center justify-content-between">
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fa fa-user mr-2"></i>
                          Total Sales
                        </p>
                        <h2>{summary.totalSales}</h2>
                       
                      </div>
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-hourglass-half mr-2"></i>
                          Total Orders
                        </p>
                        <h2>{summary.totalOrders}</h2>
                        {/* <label className="badge badge-outline-danger badge-pill">30% decrease</label> */}
                      </div>
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-cloud-download-alt mr-2"></i>
                          Review
                        </p>
                        <h2>{summary.totalReview}</h2>
                        {/* <label className="badge badge-outline-success badge-pill">12% increase</label> */}
                      </div>
                      {/* <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-check-circle mr-2"></i>
                          Update
                        </p>
                        <h2>7500</h2>
                        <label className="badge badge-outline-success badge-pill">57% increase</label>
                      </div>
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-chart-line mr-2"></i>
                          Sales
                        </p>
                        <h2>9000</h2>
                        <label className="badge badge-outline-success badge-pill">10% increase</label>
                      </div> */}
                      {/* <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-circle-notch mr-2"></i>
                          Pending
                        </p>
                        <h2>7500</h2>
                        <label className="badge badge-outline-danger badge-pill">16% decrease</label>
                      </div>  */}
                  </div>
                </div>
              </div>
            </div>
          </div>

           <div className="row grid-margin custom-margin">
            <div className="col-12">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="d-flex flex-column flex-md-row custom-margin align-items-center justify-content-between">
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fa fa-user mr-2"></i>
                          Total Products
                        </p>
                        <h2>{summary.totalProducts}</h2>
                        {/* <label className="badge badge-outline-success badge-pill">2.7% increase</label> */}
                      </div>
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-hourglass-half mr-2"></i>
                          Categories
                        </p>
                        <h2>{summary.totalCategories}</h2>
                        {/* <label className="badge badge-outline-danger badge-pill">30% decrease</label> */}
                      </div>
                      {/* <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-cloud-download-alt mr-2"></i>
                          Total Users
                        </p>
                        <h2>3500</h2>
                        <label className="badge badge-outline-success badge-pill">12% increase</label>
                      </div> */}
                      {/* <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-check-circle mr-2"></i>
                          Total Orders
                        </p>
                        <h2>{summary.totalOrders}</h2>
                       
                      </div> */}
                      <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-chart-line mr-2"></i>
                          Total Table
                        </p>
                        <h2>{summary.totalUsers}</h2>
                        {/* <label className="badge badge-outline-success badge-pill">10% increase</label> */}
                      </div>
                       {/* <div className="statistics-item">
                        <p>
                          <i className="icon-sm fas fa-circle-notch mr-2"></i>
                          Review
                        </p>
                        <h2>{summary.totalReview}</h2>
                       
                      </div>  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row custom-margin">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    <i className="fas fa-gift"></i>
                    Orders
                  </h4>
                  <canvas id="orders-chart"></canvas>
                  <div id="orders-chart-legend" className="orders-chart-legend"></div>                  
                </div>
              </div>
            </div>
            </div> */}
            {/* <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    <i className="fas fa-chart-line"></i>
                    Sales
                  </h4>
                  <h2 className="mb-5">{summary.totalSales} <span className="text-muted h4 font-weight-normal">Sales</span></h2>
                  <canvas id="sales-chart"></canvas>
                </div>
              </div>
            </div> */}
          {/* <div className="row custom-margin">
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title">
                    <i className="fas fa-chart-pie"></i>
                    Sales status
                  </h4>
                  <div className="flex-grow custom-margin-1 d-flex flex-column justify-content-between">
                    <canvas id="sales-status-chart" className="mt-3"></canvas>
                    <div className="pt-4">
                      <div id="sales-status-chart-legend" className="sales-status-chart-legend"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           </div> */}
        </div>
        </div>
        
    );
    }
export default Dashboard;
