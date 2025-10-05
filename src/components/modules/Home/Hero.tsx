

const Hero = () => {
    return (
        <>
            <section className="bg-background">
                <div className="mx-auto px-4 py-10 sm:px-6 sm:py-24 lg:px-20 lg:py-20">
                    <div className="mx-auto md:max-w-4/5 lg:max-w-3/5 text-center">
                        <h1 className="text-2xl md:text-4xl font-bold text-foreground sm:text-5xl">
                            Understand user flow and
                            <strong className="text-primary"> increase </strong>
                            conversions
                        </h1>

                        <p className="mt-4 text-base text-pretty text-foreground sm:text-lg/relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
                            accusamus impedit minima harum corporis iusto.
                        </p>

                        <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                            <a href="#"
                                className="inline-block rounded-md shadow bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700">
                                Get Started
                            </a>

                            <a href="#"
                                className="inline-block bg-background rounded-md shadow px-5 py-3 font-medium text-foreground transition-colors hover:bg-gray-50 hover:text-gray-900">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Hero;