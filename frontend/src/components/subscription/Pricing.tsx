import React from 'react'
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import Checkout from './Checkout';

// change green colours
// make features stand out more

export default function Price() {

    const prices = [
		{
			title: "Basic",
			description: "Quick security scanning suitable for small projects",
			benefits: [
				"Security Score",
				"3 Scans Per Month",
				"15 Detectors",
			],
			amount: "FREE",
			priceId: "",
		},
		{
			title: "Pro",
			description:
				"Built for developers or security engineers suitable for larger projects",
			benefits: [
				"Security Score",
				"Unlimited Scans",
				"20+ Detectors ",
				"Private API Access",
				"CI/CD and GitHub Actions",
                "Basic Remediations",
                "Basic Report",
			],
			amount: "$49 /month",
			priceId: "price_1PZAaEAk0tEcC1h0WdXHD9B1",
		},
		{
			title: "Enterpise",
			description:
				"Enterprise dealing in Crypto Development or Security with large team size. Get your scan results and reports vetted by our security professionals",
			benefits: [
				"Security Score",
				"Unlimited Scans + Manual Audit",
				"20+ Detectors & Fuzzing",
				"Private API Access",
				"CI/CD and GitHub Actions",
                "Detailed Remediations",
                "Detailed Report",
			],
			amount: "Custom",
			priceId: "",
		},
	]

  return (
    <div className="grid grid-cols1 md:grid-cols-3 gap-5">
        {prices.map((price, index)=>{

            const isPopular = index === 1;

            return <div key={index} className={cn("border rounded-md p-5 space-y-5", {"ring-2 ring-green-500":isPopular})}> 

                <div className="space-y-3">
                    <h1 className="text-2xl font-bold">{price.title}</h1>
                    <h1 className="text-3xl font-bold">{price.amount}</h1>
                    <p className="text-sm text-gray-400">{price.description}</p>
                </div>
                <div className="space-y-2">
                    {price.benefits.map((benefit, index)=>{
                        return <div key={index} className="flex items-center gap-2"> 
                            <Check />
                            <h1 className="text-sm">{benefit}</h1>

                        </div>
                    })}
                </div>
                {price.amount !== "FREE" && <Checkout priceId={price.priceId} />}
            </div>
        })}
    </div>
  )
}
