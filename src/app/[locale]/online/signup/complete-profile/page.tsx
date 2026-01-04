"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTranslations, useLocale } from "next-intl";
import { Button, Input, Select, RadioGroup } from "@/components/ui";
import { GraduationCap, Users, Heart, ArrowRight, Loader2 } from "lucide-react";

/**
 * Check if a birthdate indicates the user is under 13
 */
function isUnder13(birthDate: Date): boolean {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age < 13;
}

type UserType = "student" | "teacher" | "parent";

export default function CompleteProfilePage() {
  const t = useTranslations("OnlineProfile");
  const locale = useLocale();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [userType, setUserType] = useState<UserType>("student");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const userTypeOptions = [
    {
      value: "student",
      label: t("student"),
      description: t("studentDesc"),
      icon: <GraduationCap className="w-5 h-5 text-jamun-blue" />,
    },
    {
      value: "teacher",
      label: t("teacher"),
      description: t("teacherDesc"),
      icon: <Users className="w-5 h-5 text-jamun-blue" />,
    },
    {
      value: "parent",
      label: t("parent"),
      description: t("parentDesc"),
      icon: <Heart className="w-5 h-5 text-jamun-blue" />,
    },
  ];

  const gradeOptions = [
    { value: "5", label: t("grade5") },
    { value: "6", label: t("grade6") },
    { value: "7", label: t("grade7") },
    { value: "8", label: t("grade8") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Check if user is under 13
      const birthDateObj = new Date(birthDate);
      const under13 = userType === "student" && birthDate && isUnder13(birthDateObj);

      // Update Clerk user metadata via unsafeMetadata (publicMetadata must be set server-side)
      await user.update({
        unsafeMetadata: {
          role: userType,
          grade: userType === "student" ? parseInt(grade) : undefined,
          school: userType === "student" ? school : undefined,
          birthDate: userType === "student" ? birthDate : undefined,
          isUnder13: under13,
          profileComplete: !under13,
        },
      });

      // If under 13, redirect to parental consent flow
      if (under13) {
        router.push(`/${locale === "en" ? "" : locale + "/"}online/signup/parental-consent`);
      } else {
        router.push(`/${locale === "en" ? "" : locale + "/"}online/dashboard`);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <RadioGroup
            name="userType"
            label={t("iAmA")}
            options={userTypeOptions}
            value={userType}
            onChange={(value) => setUserType(value as UserType)}
          />

          {userType === "student" && (
            <>
              <Select
                id="grade"
                label={t("gradeLabel")}
                options={gradeOptions}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder={t("gradePlaceholder")}
                required
              />

              <Input
                id="school"
                label={t("schoolLabel")}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder={t("schoolPlaceholder")}
              />

              <Input
                id="birthDate"
                type="date"
                label={t("birthdateLabel")}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                hint={t("birthdateHelp")}
                required
              />
            </>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting || (userType === "student" && (!grade || !birthDate))}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {t("continueButton")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
