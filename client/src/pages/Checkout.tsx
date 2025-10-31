import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useCustomMutation } from "../hooks/useCustomMutation";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { motion } from "motion/react";
import SpinnerLoader from "../components/SpinnerLoader";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Redirect if user comes here directly
  if (!state) {
    navigate("/");
    return null;
  }

  const {
    experience,
    selectedDate,
    selectedTime,
    quantity,
    subtotal,
    tax,
    total,
  } = state;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    promo: "",
    agreed: false,
  });

  // Define the shape of for errors
  interface FormErrors {
    fullName: string;
    email: string;
  }

  // ADD ERROR STATE: Create a state to hold error messages
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
  });

  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(total);

  // A helper function to update the form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //  Use mutation hook for booking
  const { mutate: createBooking, isPending } = useCustomMutation({
    url: "/bookings",
    invalidateKey: `experience-${experience._id}`,
  });

  const { mutate: validatePromo } = useMutation({
    mutationFn: async (payload: { code: string; subtotal: number }) => {
      const { data } = await api.post("/promo/validate", payload);
      return data;
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message || "Invalid promo or server error";
      toast.error(message);
    },
  });

  // Handle promo code validation
  const handleApplyPromo = () => {
    validatePromo(
      { code: form.promo, subtotal },
      {
        onSuccess: (data: any) => {
          if (data.valid) {
            setDiscount(data.discount);
            setFinalTotal(data.newTotal);
            toast.success(data.message);
          } else {
            toast.error("Invalid promo code");
          }
        },
      },
    );
  };

  //  Final booking submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Start Validation ---
    const newErrors: FormErrors = { fullName: "", email: "" };
    let hasErrors = false;

    // Validate Full Name
    if (!form.fullName.trim()) {
      newErrors.fullName = "*required";
      hasErrors = true;
    }

    // Validate Email
    if (!form.email.trim()) {
      newErrors.email = "*required";
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid Email";
      hasErrors = true;
    }

    // Set the errors state
    setErrors(newErrors);

    // If there are field errors, stop submission
    if (hasErrors) {
      toast.error("Fill required fields");
      return;
    }

    if (!form.agreed) {
      toast.error("Please agree to the safety policy");
      return;
    }

    // if (!selectedDate || !selectedTime) {
    //   toast.error("Please select a date and time");
    //   return;
    // }

    createBooking({
      experienceId: experience._id,
      name: form.fullName,
      email: form.email,
      slot: { date: selectedDate, time: selectedTime },
      qty: quantity,
      promoCode: form.promo || null,
      subtotal,
      tax,
      finalPrice: finalTotal,
    });
  };

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="my-6 flex cursor-pointer items-center gap-2 text-gray-500"
      >
        <img
          src={assets.arrowIcon}
          alt="arrow icon"
          className="size-5 opacity-65"
        />
        <span className="text-sm leading-tight font-medium">Checkout</span>
      </button>

      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-baseline gap-8 lg:grid-cols-3 lg:gap-12"
      >
        {/* Left: Form Section */}
        <div className="space-y-4 rounded-xl bg-[#EFEFEF] px-6 py-5 text-[#5B5B5B] lg:col-span-2">
          {/* Full name and email */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label htmlFor="fullName" className="flex flex-col gap-2">
              <p className="text-sm leading-[18px] font-normal">
                Full name{" "}
                {errors.fullName && (
                  <span className="text-red-600">{errors.fullName}</span>
                )}{" "}
              </p>
              <input
                type="text"
                name="fullName"
                placeholder="Your name"
                value={form.fullName}
                onChange={handleChange}
                className="focus:border-primary h-10 w-full rounded-md border border-transparent bg-[#DDDDDD] px-4 py-3 text-sm leading-tight text-[#161616] placeholder:text-[#838383] focus:border focus:outline-none"
              />
            </label>
            <label htmlFor="email" className="flex flex-col gap-2">
              <p className="text-sm leading-[18px] font-normal">
                Email{" "}
                {errors.email && (
                  <span className="text-red-600">{errors.email}</span>
                )}{" "}
              </p>

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="focus:border-primary h-10 w-full rounded-md border border-transparent bg-[#DDDDDD] px-4 py-3 text-sm leading-tight text-[#161616] placeholder:text-[#838383] focus:border focus:outline-none"
              />
            </label>
          </div>

          {/* Promo code field */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="promo"
              placeholder="Promo code"
              value={form.promo}
              onChange={handleChange}
              className="focus:border-primary h-10 w-full rounded-md border border-transparent bg-[#DDDDDD] px-4 py-3 text-sm leading-tight text-[#161616] placeholder:text-[#838383] focus:border focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              disabled={discount > 0}
              className={`flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#161616] px-4 py-3 text-sm leading-[18px] font-light text-[#F9F9F9] transition hover:bg-[#2B2B2B] ${discount > 0 && "cursor-not-allowed opacity-60"}`}
            >
              Apply
            </button>
          </div>

          {/* Checkbox */}
          <label
            htmlFor="agreed"
            className="mt-3 flex items-center gap-2 text-sm leading-tight text-[#6C6C6C]"
          >
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              className="size-3 rounded border border-[#BDBDBD] bg-[#EFEFEF] accent-[#161616]"
            />
            <span className="text-xs leading-4 font-normal">
              I agree to the terms and safety policy
            </span>
          </label>
        </div>

        {/* Right: Summary Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="sticky top-18 h-max space-y-6 rounded-xl bg-[#EFEFEF] p-6 text-[#656565]"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal">
                Experience
              </span>
              <span className="text-base leading-5 font-medium text-[#161616]">
                {experience.title}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal">Date</span>
              <span className="text-sm leading-tight font-medium text-[#161616]">
                {new Date(selectedDate).toLocaleDateString("en-GB")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal">Time</span>
              <span className="text-sm leading-tight font-medium text-[#161616]">
                {selectedTime}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal">Qty</span>
              <span className="text-sm leading-tight font-medium text-[#161616]">
                {quantity}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal">Subtotal</span>
              <span className="text-sm leading-tight font-medium text-[#161616]">
                ₹{subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal">Taxes</span>
              <span className="text-sm leading-tight font-medium text-[#161616]">
                ₹{tax}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            <hr className="my-3 border-[#D9D9D9]" />

            <div className="flex justify-between text-xl leading-6 font-medium text-[#161616]">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          {/* Pay & Confirm Button */}
          <button
            disabled={isPending}
            type="submit"
            className={`bg-primary mt-4 flex w-full items-center justify-center rounded-md py-2 font-medium text-[#161616] transition ${isPending ? "bg-primary/80 cursor-not-allowed" : "hover:bg-primary-dull cursor-pointer"}`}
          >
            {isPending ? <SpinnerLoader /> : <span>Pay and Confirm</span>}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Checkout;
