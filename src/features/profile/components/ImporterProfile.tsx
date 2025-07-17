import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  User,
  Edit,
  Settings,
} from "lucide-react";

const ImporterProfile = ({ profileData }: { profileData: any }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatAddress = (address: any) => {
    return `${address.street1}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`;
  };

  return (
    <div className="font-secondary">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-orange-600 text-white text-lg font-medium">
                  {getInitials(
                    profileData?.user?.firstName,
                    profileData?.user?.lastName
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                  {profileData?.user?.firstName} {profileData?.user?.lastName}
                </h1>
                <p className="text-gray-600 font-[300] text-sm">
                  {profileData?.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 font-normal text-[11px]"
                  >
                    <User className="h-3 w-3 mr-1" />
                    {profileData?.user?.userType}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-[11px]"
                  >
                    {profileData?.user?.status}
                  </Badge>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div> */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Organization Information
                </CardTitle>
                <CardDescription className="font-[300]">
                  Organization details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-700">
                      Company Name
                    </label>
                    <p className="text-gray-900 font-medium text-sm">
                      {profileData?.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-700">Tax ID</label>
                    <p className="text-gray-900 text-sm">
                      {profileData?.taxId}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Company Email</p>
                      <p className="text-gray-900 text-sm">
                        {profileData?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="text-gray-900 text-sm">
                        {profileData?.countryCode} {profileData?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="font-normal text-gray-900">
                      {profileData?.billingAddress?.[0]?.street1}
                    </p>
                    {profileData?.billingAddress?.[0]?.street2 && (
                      <p className="font-normal text-gray-900">
                        {profileData?.billingAddress?.[0]?.street2}
                      </p>
                    )}
                    <p className="text-gray-600">
                      {profileData?.billingAddress?.[0]?.city},{" "}
                      {profileData?.billingAddress?.[0]?.state}
                    </p>
                    <p className="text-gray-600">
                      {profileData?.billingAddress?.[0]?.country}
                    </p>
                    <p className="text-gray-600 font-mono">
                      {profileData?.billingAddress?.[0]?.zipCode}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="font-normal text-gray-900">
                      {profileData?.shippingAddress?.[0]?.street1}
                    </p>
                    {profileData?.shippingAddress?.[0]?.street2 && (
                      <p className="font-normal text-gray-900">
                        {profileData?.shippingAddress?.[0]?.street2}
                      </p>
                    )}
                    <p className="text-gray-600">
                      {profileData?.shippingAddress?.[0]?.city},{" "}
                      {profileData?.shippingAddress?.[0]?.state}
                    </p>
                    <p className="text-gray-600">
                      {profileData?.shippingAddress?.[0]?.country}
                    </p>
                    <p className="text-gray-600 font-mono">
                      {profileData?.shippingAddress?.[0]?.zipCode}
                    </p>
                  </div>
                  {formatAddress(profileData?.billingAddress?.[0]) ===
                    formatAddress(profileData?.shippingAddress?.[0]) && (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-blue-50 text-blue-700 text-xs"
                    >
                      Same as billing address
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Personal Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Personal Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900 text-sm">
                      {profileData?.user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900 text-sm">
                      {profileData?.user?.countryCode}{" "}
                      {profileData?.user?.phoneNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Payment Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">
                        Net payment terms
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-800">
                        {profileData?.netTerm?.days || "N/A"}
                      </p>
                      <p className="text-sm text-green-600">days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImporterProfile;
