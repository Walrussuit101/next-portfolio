import { useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";
import PageTitle from "../components/PageTitle";

const Contact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <NavDrawer>
            <PageTitle title="Contact" />
            <NavBar />
            <Hero mainText="Reach Out" loopTexts={['Have a Question?', "Say Hello!", "See What's New."]} />
            <div className="flex justify-center w-full my-24">
                <form className="text px-4 w-full md:w-[40rem]">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input type="email" placeholder="" className="input input-bordered" required value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-60" placeholder="" required value={message} onChange={e => setMessage(e.target.value)}></textarea>
                    </div>

                    <button className="btn w-full uppercase mt-8">submit</button>
                </form>
            </div>
            <Footer />
        </NavDrawer>
    )
}

export default Contact;