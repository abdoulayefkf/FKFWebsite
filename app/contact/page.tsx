import PageHero from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() { return <><PageHero eyebrow="Contact Us" title="Let’s Connect" description="Questions, partnership ideas, and messages are welcome." image="/about/about-image.jpg"/><main className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]"><section><h2 className="text-3xl font-bold">Foundation contact</h2><p className="mt-4 leading-7 text-slate-600">Send our team a message using this secure form. For donation questions, email donate@franciskoromafoundation.org.</p><p className="mt-5 text-slate-700">info@franciskoromafoundation.org</p></section><ContactForm/></main></> }
