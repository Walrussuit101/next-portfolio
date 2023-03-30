import { ChangeEvent, FormEvent, useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";
import PageTitle from "../components/PageTitle";
import ProjectsDrawer from "../components/ProjectsDrawer";

const Contact = () => {
    /*
     -1: nothing
     0: failure
     1: success
     2: loading
    */
    const [status, setStatus] = useState(-1);
    const [form, setForm] = useState({
        email: '',
        message: ''
    });

    const updateForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(2);

        const res = await fetch('/api/contact', {
            body: JSON.stringify({ data: form}),
            method: 'POST'
        });    

        setStatus(res.ok ? 1 : 0);

        setTimeout(() => setStatus(-1), 3000);
    }
    return (
        <ProjectsDrawer>
            <NavDrawer>
                <PageTitle title="Contact" />
                <NavBar />
                <Hero mainText="Reach Out" loopTexts={['Have a Question?', "Say Hello!", "See What's New."]} />
                <div className="flex justify-center w-full my-24">
                    <form
                        className="text px-4 w-full md:w-[40rem]"
                        onSubmit={submit}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input 
                                name="email" 
                                value={form.email}
                                onChange={updateForm}
                                type="email" 
                                placeholder="" 
                                className="input input-bordered" 
                                required 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Message</span>
                            </label>
                            <textarea 
                                name="message" 
                                value={form.message}
                                onChange={updateForm}
                                className="textarea textarea-bordered h-60" 
                                placeholder="" 
                                required
                            ></textarea>
                        </div>

                        <button className="btn w-full uppercase mt-8" disabled={status !== -1} type="submit">
                            { status === -1 && 'submit' }
                            { status === 2 && 'submitting...' }
                            { status === 1 && 'submission success' }
                            { status === 0 && 'submission failure' }
                        </button>
                    </form>
                </div>
                <Footer />
            </NavDrawer>
        </ProjectsDrawer>
    )
}

export default Contact;