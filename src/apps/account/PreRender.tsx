export default function PreRenderpre() {
    return (
        <>
            <div className={" block w-full h-full p-6"}>
                <div className="block mx-auto max-w-[1100px] w-full h-full">
                    <div className="panels flex gap-4 pb-8">
                        <div className="panel-1 rounded-t-lg overflow-hidden flex-1 max-w-[750px] relative">
                            <div className="cover h-[160px] animate-block w-full "></div>
                            <div className="avatar block">
                                <div className="flex justify-between gap-4 flex-wrap px-4">
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "1em",
                                        }}
                                        className="image top-[80px] h-[130px] rounded-full w-[130px] animate-block border border-gray-600"
                                    ></div>
                                    <div className="py-2 h-4 w-[50px]"></div>
                                    <div className="client-action py-4">
                                        <div className="btn w-[75px] rounded-md h-[2em] animate-block"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="about flex justify-between px-4 w-full">
                                <div className="info flex flex-col gap-4 w-full">
                                    <h2 className="h-[1.5em] w-[200px] animate-block"></h2>
                                    <h2 className="h-[1.2em] w-[150px] animate-block"></h2>
                                    <div className="bio w-full">
                                        <p className="h-[1em] w-full animate-block max-w-[50ch] mb-2"></p>
                                        <p className="h-[1em] w-full animate-block max-w-[40ch]"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="stats h-[50px] w-full mt-8">
                                <div className="w-full h-full animate-block px-8"></div>
                            </div>

                            <div className="activities mt-8 pt-8">
                                <h2 className="h-[2em] w-[170px] animate-block"></h2>

                                <div className="activities mt-4 rounded-md">
                                    <h2 className="h-[7em] w-full animate-block"></h2>
                                </div>
                            </div>
                        </div>
                        <div className="panel-2 animate-block flex-1 max-w-[calc(1100px-750px)] rounded-t-md"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
