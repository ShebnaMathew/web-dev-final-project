import React, {useState} from "react";
import "./privacypolicy.css";

const PrivacyPolicy = () => {
    return (
        <div>
            <div className="row justify-content-md-center text-black mt-4 ms-2">
                <div className="col-8 bg-dark text-black fontFamily pt-2 pb-3 wd-round-corners wd-background wd-z-index">
                    <h1 className="d-flex text-black wd-privacy-font">Commentify Privacy Policy</h1>
                    <div className="justify-content-start">
                        <div>Effective as of 12 April 2022</div>

                        <div>
                            <ol>
                                <li><a className="wd-privacy-links" href="#embedding-about-policy">About this Policy</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-personal-data-rights">Your personal data rights and controls</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-personal-data-collection">Personal data we collect about you</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-collection-purpose">Our purpose for using your personal data</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-sharing-data">Sharing your personal data</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-retention-deletion">Data retention and deletion</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-data-safety">Keeping your personal data safe</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-children">Children</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-policy-changes">Changes to this Policy</a></li>
                                <li><a className="wd-privacy-links" href="#embedding-contact">How to contact us</a></li>
                            </ol>
                        </div>
                    </div>

                    <a name="embedding-about-policy"></a>
                    <h5 class="wd-privacy-font">1. About this Policy</h5>
                    <div>
                        <p className="wd-padding-bottom">This Policy describes how we process your personal data at Commentify Inc.</p>
                        <p className="wd-padding-bottom">It applies to your use of:</p>
                        <ul>
                            <li>all Commentify services as a user</li>
                        </ul>
                    </div>

                    <a name="embedding-personal-data-rights"></a>
                    <h5 class="wd-privacy-font">2. Your personal data rights and controls</h5>
                    <div>
                        <p className="wd-padding-bottom">Privacy laws, including the General Data Protection Regulation ("GDPR"), give rights to individuals over their personal data.

                            See your rights and their descriptions in this table.</p>

                        <table className="table table-bordered text-black">
                            <thead className="thead">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">It's your right to...</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Access</th>
                                <td>Be informed of the personal data we process about you and to request access to it</td>
                            </tr>
                            <tr>
                                <th scope="row">Rectification</th>
                                <td>Request that we amend or update your personal data where it’s inaccurate or incomplete</td>
                            </tr>
                            <tr>
                                <th scope="row">Erasure</th>
                                <td>Request that we delete certain of your personal data</td>
                            </tr>
                            <tr>
                                <th scope="row">Restriction</th>
                                <td>Request that we temporarily or permanently stop processing all or some of your personal data</td>
                            </tr>
                            <tr>
                                <th scope="row">Object</th>
                                <td><p className="wd-padding-bottom">Object to us processing your personal data at any time, on grounds relating to your particular situation</p>

                                    <p className="wd-padding-bottom">Object to your personal data being processed for direct marketing purposes</p></td>
                            </tr>
                            <tr>
                                <th scope="row">Data portability</th>
                                <td>Request a copy of your personal data in electronic format and the right to transmit that personal data for use in another party’s service</td>
                            </tr>
                            <tr>
                                <th scope="row">Not be subject to automated decision-making</th>
                                <td>Not be subject to a decision based solely on automated decision making (decisions without human involvement), including profiling, where the decision would have a legal effect on you or produce a similarly significant effect</td>
                            </tr>
                            </tbody>
                        </table>

                        <div>
                            <p className="wd-padding-bottom">How to exercise your rights with Commentify</p>

                            <div className="pb-2">
                                <span className="fw-bold">Access: </span><span>To request a copy of your personal data from Commentify, visit your account Privacy Settings. There you can automatically download much of your personal data and find out how to request more information.</span>
                            </div>

                            <div className="pb-2">
                                <span className="fw-bold">Rectification: </span><span>You can edit your User Data under "Edit profile" in your account.</span>
                            </div>

                            <div className="pb-2">
                                <div className="fw-bold">Erasure: </div>

                                <ul>
                                    <li>You can remove audio content from your profile by selecting the relevant content and choosing to remove it. For example, you can remove comments you've made on a specific song or album.</li>
                                    <li>To request erasure of your other personal data from Commentify, see our support page.</li>
                                </ul>
                                <div className="pt-2">Your other rights: You can contact Commentify directly to exercise your rights at any time (see Section 11 'How to contact us').</div>
                            </div>
                        </div>
                    </div>

                    <a name="embedding-personal-data-collection"></a>
                    <h5 className="wd-privacy-font">3. Personal data we collect about you</h5>
                    <div>
                        <div>Collected when you sign up for Commentify or when you update your account</div>
                        <table className="table table-bordered text-black">
                            <thead className="thead">
                            <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">User Data</th>
                                <td>
                                    <div>
                                        <p className="wd-padding-bottom">Personal data that we need to create your Commentify account and enables you to use our service.</p>
                                        <p className="wd-padding-bottom">The type of data collected may include your:</p>

                                        <ul className="pt-2 pb-2">
                                            <li>Profile Name</li>
                                            <li>Email Address</li>
                                            <li>Date of Birth</li>
                                        </ul>

                                        <p className="wd-padding-bottom">We receive this data from you e.g. from the sign up form or account page.</p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <a name="embedding-collection-purpose"></a>
                    <h5 className="wd-privacy-font">4. Our purpose for using your personal data</h5>
                    <div className="pb-2">
                        <p className="wd-padding-bottom">Our purpose for processing your personal data is:</p>
                        <ul className="pt-1">
                            <li>To provide the personalized Commentify Service.</li>
                            <li>To understand, diagnose, troubleshoot, and fix issues with the Commentify Service.</li>
                            <li>To evaluate and develop new features, technologies, and improvements to the Commentify Service.</li>
                        </ul>
                    </div>

                    <a name="embedding-sharing-data"></a>
                    <h5 className="wd-privacy-font">5. Sharing your personal data</h5>
                    <div className="pb-2">
                        <div>
                            <p className="wd-padding-bottom">This section sets out the categories of recipients of the personal data collected or generated through your use of the Commentify Service.</p>

                            <p className="fw-bold wd-padding-bottom">Publicly available information</p>

                            <p className="wd-padding-bottom">The following personal data will always be publicly available on the Commentify Service:</p>
                            <ul className="pt-1">
                                <li>Your profile name</li>
                                <li>Your profile photo</li>
                                <li>Your comments on artists, albums, and songs</li>
                                <li>Your likes of artists, albums, and songs</li>
                            </ul>
                        </div>

                        <a name="embedding-retention-deletion"></a>
                        <h5 className="wd-privacy-font">6. Data retention and deletion</h5>
                        <div>
                            <p className="fw-bold wd-privacy-font">Retention</p>

                            <p className="wd-padding-bottom">We keep your personal data only as long as necessary to provide you with the Commentify Service and for Commentify's legitimate and essential business purposes, such as:</p>
                            <ul className="pt-1 pb-1">
                                <li>maintaining the performance of the Commentify Service</li>
                                <li>making data-driven business decisions about new features and offerings</li>
                            </ul>

                            <p className="fw-bold wd-privacy-font">Deletion</p>
                            <p className="wd-padding-bottom">If you close or request that we close your account, we'll delete or anonymise your personal data so it no longer identifies you.</p>
                        </div>

                        <a name="embedding-data-safety"></a>
                        <h5 className="wd-privacy-font">7. Keeping your personal data safe</h5>
                        <div>
                            <p className="wd-padding-bottom">We're committed to protecting our users' personal data. We implement appropriate technical and organisational measures to help protect the security of your personal data. However, be aware that no system is ever completely secure.</p>

                            <p className="wd-padding-bottom">We have implemented various safeguards including pseudonymisation, encryption, access, and retention policies to guard against unauthorised access and unnecessary retention of personal data in our systems.</p>

                            <p className="wd-padding-bottom">To protect your user account, we encourage you to:</p>
                            <ul className="pt-1 pb-1">
                                <li>use a strong password that is unique to your Commentify account</li>
                                <li>never share your password with anyone</li>
                                <li>limit access to your computer and browser</li>
                            </ul>
                        </div>

                        <a name="embedding-children"></a>
                        <h5 className="wd-privacy-font">8. Children</h5>
                        <div>
                            <p className="wd-padding-bottom">The Commentify Service has a minimum "Age Limit". The Commentify Service is not directed to children whose age:</p>

                            <ul className="pt-1 pb-1">
                                <li>is under the age of 13 years</li>
                                <li>or, makes it illegal to process their personal data</li>
                                <li>or, requires parental consent to process their personal data</li>
                            </ul>

                            <p className="wd-padding-bottom">We do not knowingly collect personal data from children under the applicable Age Limit. If you're under the Age Limit, please do not use the Commentify Service, and do not provide any personal data to us. </p>

                            <p className="wd-padding-bottom">If we learn that we've collected the personal data of a child under the applicable Age Limit, we'll take reasonable steps to delete the personal data. This may require us to delete the Commentify account for that child.</p>
                        </div>

                        <a name="embedding-policy-changes"></a>
                        <h5 className="wd-privacy-font">9. Changes to this Policy</h5>
                        <div>
                            <p className="wd-padding-bottom">We may occasionally make changes to this Policy.</p>
                            <p className="wd-padding-bottom">When we make material changes to this Policy, we'll provide you with prominent notice as appropriate under the circumstances. For example, we may display a prominent notice within the Commentify Service or send you an email or device notification.</p>
                        </div>

                        <a name="embedding-contact"></a>
                        <h5 className="wd-privacy-font">10. How to contact us</h5>
                        <div>
                            <p className="wd-padding-bottom">For any questions or concerns about this Policy, contact our Data Protection Officer any one of these ways:</p>
                            <ul>
                                <li>Email privacy@commentify.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default PrivacyPolicy;
