import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Badge,
  CheckCircle2,
  Home,
  MapPin,
  Package,
  X,
} from "lucide-react";
import React from "react";

const AddressConfirmationModal = (props: any) => {
  const { closeModal, data, handlePlaceOrder } = props;

  return (
    <div className="bg-white w-full overflow-hidden rounded-3xl shadow-2xl font-secondary">
      {/* Header with gradient */}
      <div className="relative p-6 text-black border-b">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-black hover:bg-black/10 rounded-full"
          onClick={closeModal}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1 font-primary">
              Details Verified
            </h1>
            <p className="text-black/70 text-base">
              Ready for delivery to your location
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <span className="text-black/70">Cart</span>
          </div>
          <ArrowRight className="w-4 h-4 text-black/70" />
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <span className="text-black/70">Checkout</span>
          </div>
          <ArrowRight className="w-4 h-4 text-black/70" />
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="font-medium">Place Order</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Billing Address */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Billing Address
                  </h3>
                  <p className="text-sm text-gray-500">
                    Where we&apos;ll send your invoice
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between text-sm">
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Street Address
                        </p>
                        <p className="text-gray-900 font-semibold">
                          Bhumisthali, Gokareneshwor-2
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            City
                          </p>
                          <p className="text-gray-900">Kathmandu</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            State
                          </p>
                          <p className="text-gray-900">Bagmati</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Country
                          </p>
                          <p className="text-gray-900">Nepal</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Postal Code
                          </p>
                          <p className="text-gray-900">123</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Shipping Address
                  </h3>
                  <p className="text-sm text-gray-500">
                    Where we&apos;ll deliver your order
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between text-sm">
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Street Address
                        </p>
                        <p className="text-gray-900 font-semibold ">
                          Bhumisthali, Gokareneshwor-2
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            City
                          </p>
                          <p className="text-gray-900">Kathmandu</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            State
                          </p>
                          <p className="text-gray-900">Bagmati</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Country
                          </p>
                          <p className="text-gray-900">Nepal</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Postal Code
                          </p>
                          <p className="text-gray-900">123</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            variant="outline"
            className="flex-1 h-12 text-gray-700 border-gray-200 hover:bg-gray-50 bg-transparent"
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            variant={"default"}
            className="flex-1 h-12  text-white font-semibold shadow-lg"
            onClick={() => {
              closeModal();
              handlePlaceOrder();
            }}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          🔒 Your information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default AddressConfirmationModal;
