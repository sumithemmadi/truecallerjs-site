"use client";

import React, { useState, useEffect } from "react";
import Countries from "../components/Countries";
import { parsePhoneNumber } from "awesome-phonenumber";
import NavBar from "../components/NavBar";
import styles from "../page.module.css";
import styles2 from "./login.module.css";

const Login = () => {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    // Fetch user's IP location
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        // Extract the country code from the API response
        const countryCode = data.country_code;

        // Set the country code if it exists
        if (countryCode && Countries[countryCode]) {
          setCountryCode(countryCode);
        }
      })
      .catch((error) => {
        console.log("IP location error:", error);
      });
  }, []);

  useEffect(() => {
    // Update the country when countryCode changes
    if (countryCode && Countries[countryCode]) {
      setCountry(Countries[countryCode]);
    }
  }, [countryCode]);

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("Phone number should only contain digits (0-9)");
      return;
    }

    const pn = parsePhoneNumber(phoneNumber, { regionCode: countryCode });

    if (!pn.valid) {
      setPhoneNumberError("Invalid phone number");
      return;
    }

    // Perform login logic here
    console.log("Country:", country);
    console.log("Phone Number:", phoneNumber);

    try {
      const url = "https://dark-puce-squid-yoke.cyclic.app/login"; // Replace with your server URL
      const data = {
        pn: pn.number.e164,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 400) {
        const responseData = await response.json();
        if (responseData.status === 0) {
          setPhoneNumberError(responseData.message);
        } else {
          console.log("Response:", responseData);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles2.center}>
        <div className={styles2.card}>
          <div>
            <h3 className={styles2.card_h3}>Login &rarr;</h3>
          </div>
          <form onSubmit={handleSubmit} className={styles2.card_form}>
            <div className={styles2.form_group}>
              <label className={styles2.form_group_label} htmlFor="countryCode">
                Select Country Code
              </label>
              <div>
                <select
                  className={styles2.form_group_select}
                  id="countryCode"
                  name="countryCode"
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  required
                >
                  <option value="">Select Country Code</option>
                  {Object.keys(Countries).map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      {`${Countries[countryCode].flag} ${Countries[countryCode].name} (${Countries[countryCode].phone[0]})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles2.form_group}>
              <label className={styles2.form_group_label} htmlFor="phoneNumber">
                Phone Number
              </label>
              <div>
                <input
                  className={styles2.form_group_input}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              {phoneNumberError && (
                <span className={styles2.errorMessage}>{phoneNumberError}</span>
              )}
            </div>
            <div>
              <button className={styles2.button} type="submit">
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
