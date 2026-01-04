"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTranslations, useLocale } from "next-intl";
import { Button, Input } from "@/components/ui";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ParentalConsentPage() {
  const t = useTranslations("OnlineConsent");
  const locale = useLocale();
  const { user, isLoaded } = useUser();

  const [parentEmail, setParentEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/consent/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentEmail,
          childName: user.firstName || "Your child",
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send consent request");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Error sending consent request:", err);
      setError(t("errorGeneric"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-jamun-blue" />
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-lg mx-auto px-4 w-full">
        {isSuccess ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("requestSent")}
            </h1>
            <p className="text-gray-600">
              {t("requestSentMessage", { email: parentEmail })}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-jamun-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-jamun-blue" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("title")}
              </h1>
              <p className="text-gray-600">{t("subtitle")}</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
              <Input
                id="parentEmail"
                type="email"
                label={t("parentEmailLabel")}
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder={t("parentEmailPlaceholder")}
                required
              />

              <p className="text-sm text-gray-500">{t("privacyNote")}</p>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting || !parentEmail}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    {t("sendRequestButton")}
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
