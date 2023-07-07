import { Select, TextInput, Textarea } from "@mantine/core";
import React, { useState, useEffect } from "react";
import Property from "../components/Property";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import LoadWrapper from "../components/LoadWrapper";
import { RiEmotionSadLine } from "react-icons/ri";
import LeafletMap from "../components/LeafletMap";

function Home() {
  const [mode, setMode] = useState(0);
  const [form, setForm] = useState({
    address: "",
    min_price: "",
    max_price: "",
    bedroom: "",
    washroom: "",
  });
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.currentUser !== null) {
      navigate(from, { replace: true });
    }
  }, [auth?.currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getListings = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/estate",
        { onDownloadProgress: setLoading(true) }
      );
      if (status === 200) {
        setProperties(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const value = {
      ...form,
      type: mode === 0 ? "For Rent" : "For Sale",
    };
    navigate("/query", { state: { value } });
  };

  return (
    <>
      <LoadWrapper loading={loading} />
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
                className={`btn ${mode === 0 ? "bg-primary text-light" : "bg-light text-primary"
                  } w-1/2 h-10 rounded-md`}
                onClick={() => setMode(0)}
              >
                For Rent
              </button>
              <button
                className={`btn ${mode === 1 ? "bg-primary text-light" : "bg-light text-primary"
                  } w-1/2 h-10 rounded-md`}
                onClick={() => setMode(1)}
              >
                For Sale
              </button>
            </div>

            <div className="flex-col space-y-5">
              <div className="flex space-x-2">
                <TextInput
                  required
                  placeholder="Place, City"
                  onChange={handleChange}
                  name="address"
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Select
                  name="min_price"
                  required
                  placeholder="Minimum Price"
                  onChange={(val) => setForm({ ...form, min_price: val })}
                  className="w-1/2"
                  data={[
                    { value: "5000", label: "Rs 5000" },
                    { value: "15000", label: "Rs 15000" },
                    { value: "25000", label: "Rs 25000" },
                  ]}
                />
                <Select
                  placeholder="Maximum Price"
                  required
                  name="min_price"
                  onChange={(val) => setForm({ ...form, max_price: val })}
                  className="w-1/2"
                  data={[
                    { value: "30000", label: "Rs 30000" },
                    { value: "40000", label: "Rs 40000" },
                    { value: "50000", label: "Rs 50000" },
                    { value: "9999999999", label: "Rs 50000+" },
                  ]}
                />
              </div>
              <div className="flex space-x-2">
                <Select
                  name="bedroom"
                  required
                  placeholder="Bedrooms"
                  onChange={(val) => setForm({ ...form, bedroom: val })}
                  className="w-1/2"
                  data={[
                    { value: "1", label: "1 Bedroom" },
                    { value: "2", label: "2 Bedroom" },
                    { value: "3", label: "3 Bedroom" },
                    { value: "4", label: "4 Bedroom" },
                    { value: "5", label: "5 Bedroom" },
                    { value: "6", label: "5+ Bedroom" },
                  ]}
                />
                <Select
                  name="bathroom"
                  placeholder="Bathrooms"
                  required
                  onChange={(val) => setForm({ ...form, washroom: val })}
                  className="w-1/2"
                  data={[
                    { value: "1", label: "1 Bathroom" },
                    { value: "2", label: "2 Bathroom" },
                    { value: "3", label: "3 Bathroom" },
                    { value: "4", label: "4 Bathroom" },
                    { value: "5", label: "5 Bathroom" },
                    { value: "6", label: "5+ Bathroom" },
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

          <div className="lg:flex m-11 lg:space-x-5 space-y-5 lg:space-y-0">
            <div className="border-gray-200 border-2 shadow-lg bg-white p-5 capitalize flex flex-col items-center justify-center space-y-5">
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

        <section
          className="mt-11 flex flex-col justify-between items-center"
          id="featured"
        >
          <h1 className="text-4xl">
            <span className="text-primary bg-light p-3">Recent</span>
            Properties
          </h1>

          {properties.length > 0 ? (
            <>
              <div className="m-10 grid xl:grid-cols-5 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                {properties.map((property, i) => (
                  <Property listing={property} key={i} />
                ))}
              </div>
              <Link to="/featured">
                <button className="bg-primary p-2 rounded-md text-white w-28">
                  See More
                </button>
              </Link>
            </>
          ) : (
            <div className="m-28 flex items-center space-x-2">
              <p className="text-xl text-gray-500">Nothing to show</p>
              <RiEmotionSadLine className="text-2xl text-gray-500" />
            </div>
          )}
        </section>

        <section
          className="mt-11 flex flex-col justify-between items-center"
          id="featured"
        >
          <h1 className="text-4xl">
            <span className="text-primary bg-light p-3">Properties</span>
            Near You
          </h1>

          <div className="m-10 w-full">
            <LeafletMap properties={properties} />
          </div>
        </section>

        <section
          className="mt-11 flex flex-col justify-between items-center"
          id="contact"
        >
          <h1 className="text-4xl capitalize">
            <span className="text-primary bg-light p-3">contact</span> us
          </h1>

          <div className="lg:flex m-10 lg:space-x-5 space-y-5 lg:space-y-0 w-[calc(100%-5rem)]">
            <div className="lg:w-1/3 border-gray-200 border-2 shadow-lg bg-white p-5 capitalize flex flex-col items-center justify-center space-y-5">
              <img src="images/icon-1.png" alt="" />
              <h3 className="text-2xl">phone number</h3>
              <p>+977 1234567890</p>
              <p>+977 1234567899</p>
            </div>

            <div className="lg:w-1/3 border-gray-200 border-2 shadow-lg bg-white p-5 capitalize flex flex-col items-center justify-center space-y-5">
              <img src="images/icon-2.png" alt="" />
              <h3 className="text-2xl">email address</h3>
              <p>mail@mail.com</p>
              <p>mail@gmail.com</p>
            </div>

            <div className="lg:w-1/3 border-gray-200 border-2 shadow-lg bg-white p-5 capitalize flex flex-col items-center justify-center space-y-5">
              <img src="images/icon-3.png" alt="" />
              <h3 className="text-2xl">office address</h3>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="w-[calc(100%-5rem)] lg:h-[30rem] border-gray-200 border-2 shadow-lg bg-white p-5 capitalize lg:flex justify-between lg:space-x-5">
            <form action="" className="w-full space-y-5">
              <div className="flex space-x-5">
                <TextInput
                  label="Name"
                  type="text"
                  placeholder="name"
                  className="w-1/3"
                  required
                />
                <TextInput
                  label="Phone Number"
                  type="number"
                  required
                  placeholder="number"
                  className="w-1/3"
                />
              </div>
              <div className="flex space-x-5">
                <TextInput
                  label="Email address"
                  type="email"
                  required
                  placeholder="email"
                  className="w-1/3"
                />
                <TextInput
                  label="Subject"
                  required
                  type="text"
                  placeholder="subject"
                  className="w-1/3"
                />
              </div>
              <Textarea
                label="Message"
                required
                placeholder="Message"
                minRows={7}
              ></Textarea>
              <input
                type="submit"
                value="Send Message"
                className="bg-primary text-light active:bg-secondary p-3 rounded-md cursor-pointer"
              />
            </form>
            <iframe
              className="lg:w-1/2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625949471!2d85.29111337049024!3d27.70895594444141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1661014872136!5m2!1sen!2snp"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
