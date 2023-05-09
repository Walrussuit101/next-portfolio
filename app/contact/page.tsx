import { Metadata } from "next";
import Hero from "../../components/client/Hero";

export const metadata: Metadata = {
    title: "Tim Jefferson | Contact"
}

const Contact = () => {
    return (
        <>
            <Hero mainText="Reach Out" loopTexts={['Have a Question?', "Say Hello!", "See What's New."]} />
            <div className="flex justify-center w-full my-24">
                <form
                    action="https://formspree.io/f/mbjeknqj"
                    method="POST"
                    className="text px-4 w-full md:w-[40rem]"
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input name="email" type="email" placeholder="" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea name="message" className="textarea textarea-bordered h-60" placeholder="" required></textarea>
                    </div>

                    <button className="btn w-full uppercase mt-8">submit</button>
                </form>
            </div>
        </>
    )
}

export default Contact;