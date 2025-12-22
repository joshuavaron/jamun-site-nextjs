import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-10 w-44">
                <Image
                  src="/images/logos/jamun-white-side-logo.svg"
                  alt="The Junior Assembly of the Model United Nations"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Empowering students through competitive academic excellence and
              meaningful debate.
            </p>
            <p className="text-xs text-gray-500">
              {siteConfig.fullName} is a registered 501(c)(3) nonprofit
              organization.
            </p>
          </div>

          {/* Link Columns - always side by side */}
          <div className="grid grid-cols-3 gap-6 lg:col-span-3 lg:gap-12">
            {/* Programs Column */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Programs</h3>
              <ul className="space-y-2 sm:space-y-3">
                {siteConfig.footer.programs.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organization Column */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Organization</h3>
              <ul className="space-y-2 sm:space-y-3">
                {siteConfig.footer.organization.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Resources</h3>
              <ul className="space-y-2 sm:space-y-3">
                {siteConfig.footer.resources.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} {siteConfig.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
