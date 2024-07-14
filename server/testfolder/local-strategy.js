import passport from "passport"
import Strategy from "passport-local";
import { pool } from "../db.js";
import { comparePasswords } from "../Helpers/hash-password.js";

passport.serializeUser((user, done) => {
    console.log("--> Serializer Endpoint", user.id);
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log("--> Deserializer Endpoint", id);
    try {
        const findUser = await pool.query("SELECT id, email, password FROM users WHERE id = $1", [id]);
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser.rows[0]);
    }
    catch (err) {
        done(err, null);
    }
})

// https://stackoverflow.com/questions/32153865/what-is-done-callback-function-in-passport-strategy-configure-use-function
// https://github.com/jaredhanson/passport/blob/0b3931330e245d8e8851328a7dc436433d6411c9/lib/middleware/authenticate.js#L171

export default passport.use(
    new Strategy({ usernameField: "email" }, async (username, password, done) => {
        console.log("--> Passport Login Endpoint", username, password);
        try {
            const findUser = await pool.query("SELECT id, email, password FROM users WHERE email = $1", [username]);
            if (!findUser.rows[0]) {
                console.log("--> User does not exist");
                return done(null, false, { message: "User not found" });
            }
            if (!(comparePasswords(password, findUser.rows[0]["password"]))) {
                console.log("--> Passwords do not match");
                return done(null, false, { message: "Username or Password does not match" });
            }
            console.log("--> findUser", findUser.rows[0]);
            return done(null, findUser.rows[0]);
        }
        catch (err) {
            done(err, null);
        }
    })
)

// passport.use(new LocalStrategy(async function verify(username, password, done) {
//     console.log("--> Passport Login Endpoint", username, password);
//     try {
//         const findUser = await pool.query("SELECT id, email, password FROM users WHERE email = $1", [username]);
//         if (!findUser.rows[0]) {
//             console.log("--> User does not exist");
//             done(null, false, { message: "User does not exist." });
//         }
//         if (!(comparePasswords(password, findUser.rows[0]["password"]))) {
//             console.log("--> Passwords do not match");
//             done(null, false, "info");
//         }
//         console.log("--> findUser", findUser.rows[0]);
//         done(null, findUser.rows[0]);
//     }
//     catch (err) {
//         done(err, null);
//     }
// }))