import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAuaf4HhY6nHzeo9z3GASNOhthsS3tRaOc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "the-webpage-builder.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "the-webpage-builder",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "the-webpage-builder.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1027718157138",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1027718157138:web:6771f8eff6e91b4ca7608b",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1FMB50MSKC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Data extracted directly from C:\Users\lokha\OneDrive\Desktop\db_cluster-24-10-2026@04-07-25.backup
const backupLeads = [
  {
    id: "lead_18",
    name: "AMEENA SARKAR",
    email: "amesarka@gmail.com",
    phone: "",
    company: "",
    website: "https://almirahcollective.com/",
    message: "want to upgrade my website",
    status: "done",
    source: "call",
    budget: "31900",
    scheduledDate: "2026-07-14T18:30:00.000Z",
    scheduledTime: "05:00 PM",
    createdAt: "2026-07-15T11:51:10.282Z",
    updatedAt: "2026-07-27T09:21:17.671Z"
  },
  {
    id: "lead_19",
    name: "KRISTIN COOPER",
    email: "standon@grantmanagementassoc.com",
    phone: "",
    company: "GRANT MANAGEMENT ASSOCIATES",
    website: "https://www.grantmanagementassoc.com/",
    message: "refurbish and monthly maintaining",
    projectType: "Website",
    timeline: "1–2 weeks",
    budget: "Under ₹50K",
    status: "done",
    source: "call",
    scheduledDate: "2026-08-06T18:30:00.000Z",
    scheduledTime: "10:00 AM",
    createdAt: "2026-08-06T06:35:12.984Z",
    updatedAt: "2026-08-31T12:04:47.607Z"
  },
  {
    id: "contact_11",
    name: "Rahul Lokhande",
    email: "lokhanderahul390@gmail.com",
    phone: "+91 1234567890",
    company: "Hhj",
    message: "Rhhc",
    status: "new",
    source: "contact",
    createdAt: "2026-05-15T17:25:25.875Z",
    updatedAt: "2026-05-15T17:25:25.875Z"
  },
  {
    id: "contact_12",
    name: "Rahul Lokhande",
    email: "lokhanderahul390@gmail.com",
    phone: "+91 1234567890",
    company: "",
    message: "Hhg",
    status: "new",
    source: "contact",
    createdAt: "2026-05-18T13:26:07.459Z",
    updatedAt: "2026-05-18T13:26:07.459Z"
  },
  {
    id: "contact_13",
    name: "AK",
    email: "juniorthakur22@gmail.com",
    phone: "+91 8160154006",
    company: "",
    message: "Baat karo mujhse.",
    status: "new",
    source: "contact",
    createdAt: "2026-06-08T08:45:46.783Z",
    updatedAt: "2026-06-08T08:45:46.783Z"
  }
];

async function authenticateIfProvided() {
  let email = process.env.FIREBASE_ADMIN_EMAIL;
  let password = process.env.FIREBASE_ADMIN_PASSWORD;

  if ((!email || !password) && process.stdin.isTTY) {
    const rl = readline.createInterface({ input, output });
    try {
      email = email || (await rl.question("Admin email (leave blank to skip auth): ")).trim();
      if (email && !password) {
        password = await rl.question("Admin password: ");
      }
    } finally {
      rl.close();
    }
  }

  if (email && password) {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Authenticated as ${email}`);
  }
}

async function runImport() {
  console.log("Starting import of backup records to Firebase Firestore...");
  await authenticateIfProvided();

  for (const item of backupLeads) {
    const { id, ...data } = item;
    // Clean undefined or null fields
    const sanitized = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== undefined && v !== null) {
        sanitized[k] = v;
      }
    }
    await setDoc(doc(db, "leads", id), sanitized, { merge: true });
    console.log(`✓ Imported: ${item.name} (${item.email}) [${item.status}] - ID: ${id}`);
  }
  console.log("All backup records successfully imported into Firebase Firestore!");
  process.exit(0);
}

runImport().catch((err) => {
  console.error("Import failed:", err.code || err.message || err);
  if (err.code === "permission-denied") {
    console.error("Tip: Publish firestore.rules first, then set FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD or enter them when prompted.");
  }
  process.exit(1);
});
