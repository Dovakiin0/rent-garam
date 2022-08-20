import { Select, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";

function Home() {
  const [mode, setMode] = useState(0);
  const [form, setForm] = useState({
    name: "",
    place: "",
    min_price: "",
    max_price: "",
    bedroom: "",
    bathroom: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="bg-[#efefef]">
      <section
        className="bg-[url('../../images/home-bg.jpg')] h-screen flex items-center justify-center p-5"
        id="home"
      >
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-xl flex-col w-full sm:w-1/2 lg:w-1/3 p-10 space-y-10 rounded-md"
        >
          <h3 className="text-3xl capitalize text-center">
            find your perfect Place
          </h3>

          <div className="flex w-full">
            <button
              className={`btn ${
                mode === 0 ? "bg-primary text-light" : "bg-light text-primary"
              } w-1/2 h-10 rounded-md`}
              onClick={() => setMode(0)}
            >
              For Rent
            </button>
            <button
              className={`btn ${
                mode === 1 ? "bg-primary text-light" : "bg-light text-primary"
              } w-1/2 h-10 rounded-md`}
              onClick={() => setMode(1)}
            >
              For Sell
            </button>
          </div>

          <div className="flex-col space-y-5">
            <div className="flex space-x-2">
              <TextInput
                placeholder="Name"
                onChange={handleChange}
                name="name"
                className="w-1/2"
              />
              <TextInput
                placeholder="Place, City"
                onChange={handleChange}
                name="place"
                className="w-1/2"
              />
            </div>
            <div className="flex space-x-2">
              <Select
                name="min_price"
                placeholder="Minimum Price"
                onSelect={handleChange}
                className="w-1/2"
                data={[
                  { value: "5000", label: "Rs 5000" },
                  { value: "15000", label: "Rs 15000" },
                  { value: "25000", label: "Rs 25000" },
                ]}
              />
              <Select
                placeholder="Maximum Price"
                name="min_price"
                onSelect={handleChange}
                className="w-1/2"
                data={[
                  { value: "30000", label: "Rs 5000" },
                  { value: "40000", label: "Rs 40000" },
                  { value: "50000", label: "Rs 50000" },
                ]}
              />
            </div>
            <div className="flex space-x-2">
              <Select
                name="bedroom"
                placeholder="Bedrooms"
                onSelect={handleChange}
                className="w-1/2"
                data={[
                  { value: "1", label: "1 Bedroom" },
                  { value: "2", label: "2 Bedroom" },
                  { value: "3", label: "3 Bedroom" },
                  { value: "4", label: "4 Bedroom" },
                  { value: "5", label: "5 Bedroom" },
                  { value: "99", label: "5+ Bedroom" },
                ]}
              />
              <Select
                name="bathroom"
                placeholder="Bathrooms"
                onSelect={handleChange}
                className="w-1/2"
                data={[
                  { value: "1", label: "1 Bathroom" },
                  { value: "2", label: "2 Bathroom" },
                  { value: "3", label: "3 Bathroom" },
                  { value: "4", label: "4 Bathroom" },
                  { value: "5", label: "5 Bathroom" },
                  { value: "99", label: "5+ Bathroom" },
                ]}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full h-9 rounded-md active:bg-secondary"
          >
            Search Property
          </button>
        </form>
      </section>

      <section
        className="mt-10 flex flex-col justify-between items-center"
        id="services"
      >
        <h1 className="text-4xl">
          Our <span className="text-primary bg-light p-3">Services</span>
        </h1>

        <div className="flex m-28 space-x-10">
          <div className="border-gray-200 border-2 shadow-lg bg-white p-10 capitalize flex flex-col items-center justify-center space-y-5">
            <img src="images/s-1.png" alt="" />
            <h3 className="text-2xl">buying home</h3>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              distinctio ipsa ab cum error quas fuga ad? Perspiciatis, autem
              officiis?
            </p>
            <button className="bg-light text-primary capitalize rounded-md h-11 w-1/2">
              learn more
            </button>
          </div>

          <div className="border-gray-200 border-2 shadow-lg bg-white p-10 capitalize flex flex-col items-center justify-center space-y-5">
            <img src="images/s-2.png" alt="" />
            <h3 className="text-2xl">renting home</h3>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              distinctio ipsa ab cum error quas fuga ad? Perspiciatis, autem
              officiis?
            </p>
            <button className="bg-light text-primary capitalize rounded-md h-11 w-1/2">
              learn more
            </button>
          </div>

          <div className="border-gray-200 border-2 shadow-lg bg-white p-10 capitalize flex flex-col items-center justify-center space-y-5">
            <img src="images/s-3.png" alt="" />
            <h3 className="text-2xl">selling home</h3>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              distinctio ipsa ab cum error quas fuga ad? Perspiciatis, autem
              officiis?
            </p>
            <button className="bg-light text-primary capitalize rounded-md h-11 w-1/2">
              learn more
            </button>
          </div>
        </div>
      </section>

      <section className="featured" id="featured">
        <h1 className="heading">
          <span>featured</span> properties
        </h1>

        <div className="box-container">
          <div className="box">
            <div className="image-container">
              <img src="images/img-1.jpg" alt="" />
              <div className="info">
                <h3>3 days ago</h3>
                <h3>for rent</h3>
              </div>
              <div className="icons">
                <a href="#" className="fas fa-film">
                  <h3>1</h3>
                </a>
                <a href="#" className="fas fa-camera">
                  <h3>4</h3>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="price">
                <h3>$25,000/mo</h3>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-envelope"></a>
                <a href="#" className="fas fa-phone"></a>
              </div>
              <div className="location">
                <h3>modern apartments</h3>
                <p>jogeshwari west, mumbai, india - 400104</p>
              </div>
              <div className="details">
                <h3>
                  <i className="fas fa-expand"></i> 3500 sqft
                </h3>
                <h3>
                  <i className="fas fa-bed"></i> 3 beds
                </h3>
                <h3>
                  <i className="fas fa-bath"></i> 2 baths
                </h3>
              </div>
              <div className="buttons">
                <a href="#" className="btn">
                  request info
                </a>
                <a href="#" className="btn">
                  view details
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="image-container">
              <img src="images/img-2.jpg" alt="" />
              <div className="info">
                <h3>6 days ago</h3>
                <h3>for sell</h3>
              </div>
              <div className="icons">
                <a href="#" className="fas fa-film">
                  <h3>2</h3>
                </a>
                <a href="#" className="fas fa-camera">
                  <h3>7</h3>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="price">
                <h3>$25,000/mo</h3>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-envelope"></a>
                <a href="#" className="fas fa-phone"></a>
              </div>
              <div className="location">
                <h3>modern apartments</h3>
                <p>jogeshwari west, mumbai, india - 400104</p>
              </div>
              <div className="details">
                <h3>
                  <i className="fas fa-expand"></i> 3500 sqft
                </h3>
                <h3>
                  <i className="fas fa-bed"></i> 3 beds
                </h3>
                <h3>
                  <i className="fas fa-bath"></i> 2 baths
                </h3>
              </div>
              <div className="buttons">
                <a href="#" className="btn">
                  request info
                </a>
                <a href="#" className="btn">
                  view details
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="image-container">
              <img src="images/img-3.jpg" alt="" />
              <div className="info">
                <h3>1 days ago</h3>
                <h3>for rent</h3>
              </div>
              <div className="icons">
                <a href="#" className="fas fa-film">
                  <h3>1</h3>
                </a>
                <a href="#" className="fas fa-camera">
                  <h3>6</h3>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="price">
                <h3>$25,000/mo</h3>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-envelope"></a>
                <a href="#" className="fas fa-phone"></a>
              </div>
              <div className="location">
                <h3>modern apartments</h3>
                <p>jogeshwari west, mumbai, india - 400104</p>
              </div>
              <div className="details">
                <h3>
                  <i className="fas fa-expand"></i> 3500 sqft
                </h3>
                <h3>
                  <i className="fas fa-bed"></i> 3 beds
                </h3>
                <h3>
                  <i className="fas fa-bath"></i> 2 baths
                </h3>
              </div>
              <div className="buttons">
                <a href="#" className="btn">
                  request info
                </a>
                <a href="#" className="btn">
                  view details
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="image-container">
              <img src="images/img-4.jpg" alt="" />
              <div className="info">
                <h3>9 days ago</h3>
                <h3>for rent</h3>
              </div>
              <div className="icons">
                <a href="#" className="fas fa-film">
                  <h3>2</h3>
                </a>
                <a href="#" className="fas fa-camera">
                  <h3>6</h3>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="price">
                <h3>$25,000/mo</h3>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-envelope"></a>
                <a href="#" className="fas fa-phone"></a>
              </div>
              <div className="location">
                <h3>modern apartments</h3>
                <p>jogeshwari west, mumbai, india - 400104</p>
              </div>
              <div className="details">
                <h3>
                  <i className="fas fa-expand"></i> 3500 sqft
                </h3>
                <h3>
                  <i className="fas fa-bed"></i> 3 beds
                </h3>
                <h3>
                  <i className="fas fa-bath"></i> 2 baths
                </h3>
              </div>
              <div className="buttons">
                <a href="#" className="btn">
                  request info
                </a>
                <a href="#" className="btn">
                  view details
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="image-container">
              <img src="images/img-5.jpg" alt="" />
              <div className="info">
                <h3>10 days ago</h3>
                <h3>for sell</h3>
              </div>
              <div className="icons">
                <a href="#" className="fas fa-film">
                  <h3>3</h3>
                </a>
                <a href="#" className="fas fa-camera">
                  <h3>8</h3>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="price">
                <h3>$25,000/mo</h3>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-envelope"></a>
                <a href="#" className="fas fa-phone"></a>
              </div>
              <div className="location">
                <h3>modern apartments</h3>
                <p>jogeshwari west, mumbai, india - 400104</p>
              </div>
              <div className="details">
                <h3>
                  <i className="fas fa-expand"></i> 3500 sqft
                </h3>
                <h3>
                  <i className="fas fa-bed"></i> 3 beds
                </h3>
                <h3>
                  <i className="fas fa-bath"></i> 2 baths
                </h3>
              </div>
              <div className="buttons">
                <a href="#" className="btn">
                  request info
                </a>
                <a href="#" className="btn">
                  view details
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="image-container">
              <img src="images/img-6.jpg" alt="" />
              <div className="info">
                <h3>3 days ago</h3>
                <h3>for sell</h3>
              </div>
              <div className="icons">
                <a href="#" className="fas fa-film">
                  <h3>1</h3>
                </a>
                <a href="#" className="fas fa-camera">
                  <h3>4</h3>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="price">
                <h3>$25,000/mo</h3>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-envelope"></a>
                <a href="#" className="fas fa-phone"></a>
              </div>
              <div className="location">
                <h3>modern apartments</h3>
                <p>jogeshwari west, mumbai, india - 400104</p>
              </div>
              <div className="details">
                <h3>
                  <i className="fas fa-expand"></i> 3500 sqft
                </h3>
                <h3>
                  <i className="fas fa-bed"></i> 3 beds
                </h3>
                <h3>
                  <i className="fas fa-bath"></i> 2 baths
                </h3>
              </div>
              <div className="buttons">
                <a href="#" className="btn">
                  request info
                </a>
                <a href="#" className="btn">
                  view details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h1 className="heading">
          <span>contact</span> us
        </h1>

        <div className="icons-container">
          <div className="icons">
            <img src="images/icon-1.png" alt="" />
            <h3>phone number</h3>
            <p>+977 1234567890</p>
            <p>+977 1234567899</p>
          </div>

          <div className="icons">
            <img src="images/icon-2.png" alt="" />
            <h3>email address</h3>
            <p>mail@mail.com</p>
            <p>mail@gmail.com</p>
          </div>

          <div className="icons">
            <img src="images/icon-3.png" alt="" />
            <h3>office address</h3>
            <p>Kathmandu, Nepal</p>
          </div>
        </div>

        <div className="row">
          <form action="">
            <div className="inputBox">
              <input type="text" placeholder="name" />
              <input type="number" placeholder="number" />
            </div>
            <div className="inputBox">
              <input type="email" placeholder="email" />
              <input type="text" placeholder="subject" />
            </div>
            <textarea
              name=""
              placeholder="message"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <input type="submit" value="send message" className="btn" />
          </form>

          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1626697480414!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Home;
