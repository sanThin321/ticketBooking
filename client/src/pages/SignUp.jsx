import dzong from "../assets/dzong.jpeg";
export const SignUp = () => {
    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-12 col-md-5  col-lg-5" >
                    <img src={dzong} className="img-fluid rounded" alt="dzong" />
                </div>
                <div className="col-12 col-md-7 col-lg-7">
                    <div className="mb-4">
                        <h1>Sign Up</h1>
                        <p>Let’s get you all set up so you can access your personal account.</p>
                    </div>

                    <form className="g-3">
                        <div className="col-auto mb-4 d-flex justify-content-between gap-4">
                            <div className="w-50">
                                <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                                <input type="text" className="form-control" id="inputPassword2" placeholder="Password" />
                            </div>

                            <div className="w-50">
                                <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                                <input type="text" className="form-control" id="inputPassword2" placeholder="Password" />
                            </div>

                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                            <input type="password" className="form-control" id="inputPassword2" placeholder="Password" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
