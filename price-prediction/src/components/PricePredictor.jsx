import React, { useState } from "react";
import FormField from "../components/FormField";
import Logo from "../components/Logo";
import ResultCard from "../components/ResultCard";
import { fields, initialFormState, validate ,URL} from "../utils";
import axios from "axios";

const PricePredictor = () => {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        const error = validate(name, value, form);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate(null, null, form, setErrors);
        if (!isValid) return;

        setLoading(true);
    
        try {
            const res = await axios.post(URL, form);
            setPredictedPrice(res.data.predicted_price);
        } catch (error) {
           console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setPredictedPrice(null);
        setForm(initialFormState);
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-6">
            <Logo />
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl mt-6">
                {predictedPrice === null ? (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-[#12666F]">
                            Material Price Predictor
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map((field) => (
                                <FormField
                                    key={field.name}
                                    {...field}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    onBlur={(e) => {
                                        const error = validate(e.target.name, e.target.value, form);
                                        setErrors((prev) => ({ ...prev, [e.target.name]: error }));
                                    }}
                                    error={errors[field.name]}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 mt-6 text-white font-semibold rounded-md ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#12666F] hover:bg-[#0f505b]"
                            }`}
                        >
                            {loading ? "Loading..." : "Predict Price"}
                        </button>
                    </form>
                ) : (
                    <ResultCard price={predictedPrice} onReset={resetForm} />
                )}
            </div>
        </div>
    );
};

export default PricePredictor;
