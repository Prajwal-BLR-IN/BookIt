import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useCustomMutation } from "../hooks/useCustomMutation";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

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

  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(total);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //  Use single mutation hook for both promo and booking
  const { mutate: createBooking } = useCustomMutation({
    url: "/bookings",
    invalidateKey: `experience-${experience._id}`,
    onSuccessRedirect: () => navigate("/confirmation"),
  });

  const { mutate: validatePromo } = useMutation({
    mutationFn: async (payload: { code: string; subtotal: number }) => {
      // <-- Add types
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

    if (!form.agreed) {
      toast.error("Please agree to the safety policy");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

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

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-baseline gap-8 lg:grid-cols-3 lg:gap-12"
      >
        {/* Left: Form Section */}
        <div className="space-y-4 rounded-xl bg-[#EFEFEF] px-6 py-5 text-[#5B5B5B] lg:col-span-2">
          {/* Full name and email */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label htmlFor="fullName" className="flex flex-col gap-2">
              <p className="text-sm leading-[18px] font-normal">Full name</p>
              <input
                type="text"
                name="fullName"
                placeholder="Your name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="focus:border-primary h-10 w-full rounded-md border border-transparent bg-[#DDDDDD] px-4 py-3 text-sm leading-tight text-[#161616] placeholder:text-[#838383] focus:border focus:outline-none"
              />
            </label>
            <label htmlFor="email" className="flex flex-col gap-2">
              <p className="text-sm leading-[18px] font-normal">Email</p>

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
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
        <div className="sticky top-18 h-max space-y-6 rounded-xl bg-[#EFEFEF] p-6 text-[#656565]">
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
            type="submit"
            className="bg-primary hover:bg-primary-dull mt-4 w-full cursor-pointer rounded-md py-2 font-medium text-[#161616] transition"
          >
            Pay and Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
