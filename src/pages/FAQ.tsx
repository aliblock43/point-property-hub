
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Buying a Home",
      questions: [
        {
          question: "How much do I need for a down payment?",
          answer: "Down payment requirements vary by loan type. Conventional loans typically require 3-20%, FHA loans require as little as 3.5%, and VA loans may require 0% down for qualified veterans. The amount also depends on your credit score and the lender's requirements."
        },
        {
          question: "What is pre-approval and why do I need it?",
          answer: "Pre-approval is a process where a lender reviews your financial information and determines how much you can borrow. It shows sellers you're a serious buyer and can help you act quickly in competitive markets. Pre-approval typically lasts 60-90 days."
        },
        {
          question: "How long does the home buying process take?",
          answer: "The typical home buying process takes 30-60 days from offer acceptance to closing. However, this can vary based on factors like loan type, property condition, and market conditions. Finding the right home can take anywhere from weeks to months."
        },
        {
          question: "What should I look for during a home inspection?",
          answer: "A professional home inspection covers structural elements, electrical systems, plumbing, HVAC, roofing, and more. Major red flags include foundation issues, electrical problems, plumbing leaks, roof damage, and HVAC system failures. Your inspector will provide a detailed report."
        }
      ]
    },
    {
      category: "Selling a Home",
      questions: [
        {
          question: "How do I determine my home's value?",
          answer: "Your home's value is determined by factors like location, size, condition, recent comparable sales, and current market conditions. A Comparative Market Analysis (CMA) from a real estate agent or a professional appraisal can provide accurate valuations."
        },
        {
          question: "What improvements add the most value?",
          answer: "Kitchen and bathroom updates typically offer the best return on investment. Other valuable improvements include fresh paint, new flooring, updated lighting, and enhanced curb appeal. Focus on improvements that appeal to the broadest range of buyers."
        },
        {
          question: "How long will it take to sell my home?",
          answer: "The average time to sell varies by market conditions and location. In a balanced market, homes typically sell within 30-60 days. Pricing competitively, staging well, and marketing effectively can help reduce time on market."
        },
        {
          question: "What are closing costs for sellers?",
          answer: "Seller closing costs typically range from 6-10% of the sale price and include real estate agent commissions, title insurance, transfer taxes, attorney fees, and any agreed-upon buyer concessions or repairs."
        }
      ]
    },
    {
      category: "Working with Agents",
      questions: [
        {
          question: "How do I choose the right real estate agent?",
          answer: "Look for an agent with local market knowledge, strong communication skills, proven track record, and positive client reviews. Interview multiple agents and choose someone you trust and feel comfortable working with throughout the process."
        },
        {
          question: "How much do real estate agents charge?",
          answer: "Real estate commissions are typically 5-6% of the sale price, split between the buyer's and seller's agents. For buyers, agent services are usually free as the seller pays the commission. Commission rates can sometimes be negotiated."
        },
        {
          question: "Can I buy or sell without an agent?",
          answer: "While possible, buying or selling without an agent (FSBO - For Sale By Owner) requires significant time, knowledge, and effort. Agents provide valuable expertise in pricing, marketing, negotiations, contracts, and navigating complex transactions."
        }
      ]
    },
    {
      category: "Financing & Mortgages",
      questions: [
        {
          question: "What types of mortgages are available?",
          answer: "Common mortgage types include conventional loans, FHA loans, VA loans, USDA loans, and jumbo loans. Each has different requirements, down payment options, and benefits. Your lender can help determine which option best fits your situation."
        },
        {
          question: "How can I improve my chances of loan approval?",
          answer: "Improve your credit score, reduce debt-to-income ratio, save for a larger down payment, maintain stable employment, avoid major purchases before closing, and provide all required documentation promptly to your lender."
        },
        {
          question: "What is PMI and when can I remove it?",
          answer: "Private Mortgage Insurance (PMI) is required on conventional loans with less than 20% down payment. You can typically request removal when you reach 20% equity, and it's automatically removed at 22% equity. FHA loans have different mortgage insurance rules."
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions about buying, selling, and working with real estate professionals.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        {filteredFAQ.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {category.category}
            </h2>
            
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const itemIndex = categoryIndex * 100 + questionIndex;
                const isOpen = openItems.includes(itemIndex);
                
                return (
                  <Card key={questionIndex} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* No Results */}
        {searchTerm && filteredFAQ.length === 0 && (
          <Card className="p-8 text-center">
            <CardContent className="p-0">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any FAQs matching your search. Try different keywords or browse all categories.
              </p>
              <Button
                onClick={() => setSearchTerm("")}
                variant="outline"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact CTA */}
        <Card className="mt-12 bg-blue-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our expert team is here to help. Contact us directly for personalized assistance with your real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:+15551234567">Call: (555) 123-4567</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
