import React from "react";
import ReactDOM from "react-dom";

function Footer(){
    return(
        <div>
    <div className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-4">
                    
                    <div className="title">
                        About us
                    </div>
                    <div className="description">   
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam iusto, sit deleniti est explicabo, deserunt praesentium ipsum incidunt culpa nesciunt eum, consequatur accusantium consequuntur, rerum inventore? Ad dolorem fuga qui.
                    </div>
                    <div className="title">
                        Contact Us
                    </div>
                    <div className="footer-list">   
                      <div className="phone">    <i className="fa fa-phone"> </i> 01-4389204</div>
                            <div className="email">  <i className="fa fa-envelope"> </i>education@gmail.com</div>
                       {/* </ul> */}
                    </div>
                </div>
                <div className="col-md-3 col-lg-2 col-6 col-sm-3">
                    <div className="title"> 
                        Information
                    </div>
                    <div className="footer-list">   
                        <ul>
                            <li><a href="   ">About</a>    </li>
                            <li><a href="   ">Testimonial</a></li>
                            <li><a href="   ">Blogs</a></li>
                            <li><a href="   ">Events</a></li>
                            <li><a href="   ">About</a>    </li>
                            <li><a href="   ">Testimonial</a></li>
                            <li><a href="   ">Blogs</a></li>
                            <li><a href="   ">Events</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-lg-2 col-6 col-sm-3">
                      <div className="title"> 
                        Helpful Link
                    </div>
                    <div className="footer-list">   
                        <ul>
                            <li><a href="   ">About</a>    </li>
                            <li><a href="   ">Testimonial</a></li>
                            <li><a href="   ">Blogs</a></li>
                            <li><a href="   ">Events</a></li>
                             <li><a href="   ">About</a>    </li>
                            <li><a href="   ">Testimonial</a></li>
                            <li><a href="   ">Blogs</a></li>
                            <li><a href="   ">Events</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-lg-4">
                    <div className="newsletter-container">  
                        <div className="subscribe-title">   
                                Subscribe to get Updated
                        </div>
                        <form>
                            <input type="" className="form-control" placeholder="Enter your Email" />
                            <div className="button-container">  
                                  <a type="submit" className="btn btn-success">Subscribe</a>
                            </div>
                        </form>
                    </div>
                    <div className="social-link">
                        <div className="title">
                            Connect with us:
                        </div>
                        <ul>
                            <li><a href="" ><i className="fab fa-facebook"></i></a></li>
                            <li><a href="" ><i className="fab fa-instagram" ></i></a></li>
                            <li><a href=""><i className="fab fa-linkedin"></i></a></li>
                            <li><a href=""><i className="fab fa-twitter"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="buttom-footer"> 
                <p> &copy; Copyright 2020 Vedhayu. </p>
        </div>
    </div>
        
</div>
    )
}

export default Footer;