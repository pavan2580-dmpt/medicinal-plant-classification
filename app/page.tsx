import Link from "next/link";
import Image from "next/image";
import { Leaf, Search, Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">LeafMed</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800">
                  AI-based classification of medicinal plants using VGG-19
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Upload any medicinal plant leaf image and instantly learn
                  about its medical properties and uses.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[350px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="./banner.png?height=500&width=500"
                  alt="Medicinal plants collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">
                  How LeafMed Works
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Our advanced AI system identifies medicinal plants and
                  provides detailed information about their healing properties.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-green-100 p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-4">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Upload</h3>
                <p className="text-center text-gray-600">
                  Simply take a photo or upload an image of any medicinal plant
                  leaf.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-green-100 p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-4">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Identify</h3>
                <p className="text-center text-gray-600">
                  Our AI instantly identifies the plant species with high
                  accuracy.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-green-100 p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Learn</h3>
                <p className="text-center text-gray-600">
                  Discover detailed medicinal properties, uses, and preparation
                  methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
              <div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                    About Our Project Team
                  </h2>
                  <p className="text-gray-600 md:text-xl">
                    We are a team of passionate Computer Science students from
                    Sasi College (CSE - A Section), working under the guidance
                    of experienced mentors to bring innovation and excellence to
                    our project.
                  </p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-green-200 p-1">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-gray-600">
                        Team Members: T. Prasnath, V. Pavan Ganesh Krishna, S.
                        Rahul, M. Ramesh
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-green-200 p-1">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-gray-600 font-bold">
                        Mentor: P. KrishnaMoorthy
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-green-200 p-1">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-gray-600 font-bold">
                        Project Supervisor: Dr. Siva Rama Rao
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="./crystal-removed.png?height=400&width=600"
                  alt="Medicinal herbs collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Ready to Explore?
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed">
                  Join thousands of herbalists, researchers, and plant
                  enthusiasts using LeafMed.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/signup">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12 px-4 md:px-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-lg font-bold">LeafMed</span>
            </Link>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LeafMed. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
