import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import emailjs from '@emailjs/browser';


import './App.scss'

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, data, import.meta.env.VITE_EMAILJS_USER_ID)
      .then((result) => {
        setIsSubmitted(true)
      }, (error) => {
        setIsError(true)
      });

  };

  return (
    <>
      <nav>
        <img src="/logo-transparent.png" alt="New Hope Construction Logo" />
        <a href="tel:+18655852264"> <FaPhone /> (865) 585 2264</a>
      </nav>

      <div className="hero">
        <div className="text-overlay">
          <h1>Building the Future</h1>
          <p>Excavation services in Tennessee</p>
          <a href='#contact'>Request a Quote Now</a>
        </div>
      </div>

      <div className="about">
        <h1>About Us</h1>
        <p>
          At New Hope Construction, we turn your building ideas into reality. It's our job to make sure every project is something we can all be proud of, meeting your expectations, finishing on time, and sticking to your budget. Our experienced team is ready to work with you, every step of the way.
        </p>
      </div>

      <div className="contact" id="contact">

        <form onSubmit={handleSubmit(onSubmit)}>
          {isError && <h1>There was an error submitting the form. Please try again later.</h1>}

          {isSubmitted && <h1>Thank you for your submission. We will get back to you shortly.</h1>}

          {!isSubmitted && !isError &&
            <>
              <h1>Get Your Free Estimate</h1>
              <div>
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" {...register('fullName', { required: true })} />
                {errors.fullName && <span>This field is required</span>}
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" {...register('phone', { required: true })} />
                {errors.phone && <span>This field is required</span>}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email', { required: true })} />
                {errors.email && <span>This field is required</span>}
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register('description', { required: true })}></textarea>
                {errors.description && <span>This field is required</span>}
              </div>

              <button type="submit">Get Quote</button>
            </>}
        </form>
      </div>

      <div className="services">
        <h1>Our Services</h1>
        <div className="ccard">
          <div id="carouselExample" className="carousel carousel-dark slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/slideshow1.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/slideshow2.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/slideshow3.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/slideshow4.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="cbody">
            <h1 className="ctitle">Excavation</h1>
            <p className="ctext"> Excavation services are essential for construction projects, providing the groundwork necessary for building foundations. This involves tasks like land clearing, trenching, and grading, ensuring a stable base for construction. Professional excavation utilizes specialized equipment and techniques for efficient and safe completion of these tasks, laying the foundation for your next project. </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <div className="left">
            <img src="/logo-transparent.png" alt="New Hope Construction Logo" />
            <p>© 2024 New Hope Construction</p>
          </div>
          <div className="contact">
            <h3>Contact Us</h3>
            <a href="mailto:Newhope.construction.inc@gmail.com"> <MdEmail /> Email </a>
            <a href="tel:+18655852264"> <FaPhone /> (865) 585 2264</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
