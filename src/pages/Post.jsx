
import logo from '../assets/logo.png';
import post from '../assets/post.png';



export default function Post() {
    return <>
        <div className="postCont">
            <div className="func">
                <div className="formAll">
                    <form>
                        <div className="typePost">
                            <div className="postAdd">
                                <h2>Upload</h2>
                            </div>
                            <ul>
                                <label htmlFor="tp">Type</label>
                                <select id='tp'>
                                    <option value="">Type post</option>
                                    <option value="sports">Sports</option>
                                    <option value="announcement">Announcement</option>
                                    <option value="supply">Supply</option>
                                </select>
                            </ul>
                        </div>
                        <ul>
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder='Title' />
                        </ul>
                        <ul>
                            <label htmlFor="Description">Description</label>
                            <textarea id="Description"></textarea>
                        </ul>
                        <div className="bottomInput">
                            <section>
                                <ul>
                                    <label htmlFor="st">Start</label>
                                    <input type="date" id='st' placeholder='Start' />
                                </ul>
                                <ul>
                                    <label htmlFor="en">End</label>
                                    <input type="date" placeholder='End' id='en' />
                                </ul>
                            </section>
                            <button><i className="fas fa-share"></i> Upload</button>
                        </div>
                    </form>
                </div>
                <div className="titleLabel">
                    <section>
                        <img src={post} alt="" />
                        <h2>Posting  Announcement</h2>
                    </section>
                </div>
            </div>
            <div className="sidePostAll">
                <div className="headSide">
                    <ol>
                        <img src={logo} alt="" />
                    </ol>
                    <ol>
                        <li><i className="fas fa-circle"></i> Ongoing</li>
                        <li><i className="fas fa-circle"></i> Incoming</li>
                        <li><i className="fas fa-circle"></i> Ended</li>
                    </ol>
                </div>
                <div className="allPostCont">
                    <h2>Posted</h2>
                    <div className="dataPost">
                        <ol>
                            <li><i className="fas fa-circle"></i></li>
                            <li>
                                <p>Title</p>
                                <p>Sports sads asdsd asdsd</p>
                            </li>
                            <li>
                                <p>Start</p>
                                <p>May, 16 2025</p>
                            </li>
                        </ol>
                        <ol>
                            <li><i className="fas fa-circle"></i></li>
                            <li>
                                <p>Title</p>
                                <p>Sports</p>
                            </li>
                            <li>
                                <p>Start</p>
                                <p>May, 16 2025</p>
                            </li>
                        </ol>
                        <ol>
                            <li><i className="fas fa-circle"></i></li>
                            <li>
                                <p>Title</p>
                                <p>Sports</p>
                            </li>
                            <li>
                                <p>Start</p>
                                <p>May, 16 2025</p>
                            </li>
                        </ol>
                        <ol>
                            <li><i className="fas fa-circle"></i></li>
                            <li>
                                <p>Title</p>
                                <p>Sports</p>
                            </li>
                            <li>
                                <p>Start</p>
                                <p>May, 16 2025</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </>
}