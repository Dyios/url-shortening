import { db } from '../../../firebase';
import { doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { getSession } from "next-auth/react"

async function handler(req, res) {
    const session = await getSession({ req })
    if (session) {
        switch (req.method) {
            case 'POST':
                // {
                //     "email": "email",
                //     "original_link": "http://example.org/very/long/link.html",
                //     "short_link": "https://9qr.de/KCvbO"
                // }
                const { original_link, short_link } = req.body;
                const usersRef = doc(db, 'users', req.body.email);

                await setDoc(usersRef, { links: arrayUnion({ original_link, short_link }) }, { merge: true });
                res.status(200).json(req.body);
                break;
            case 'GET':
                // http://localhost:3000/api/users?user=email
                const docRef = doc(db, "users", req.query.user);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    res.status(200).json(docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    res.status(404).json({ message: "No such document!" });
                }
                break
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default handler;