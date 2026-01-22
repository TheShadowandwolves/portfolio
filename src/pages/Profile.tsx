import React, { useEffect, useMemo, useState, Fragment } from "react";
import { auth, db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserProfile {
  id: string; // Firestore doc id
  email: string;
  age: string;
  city: string;
  country: string;
  gender: string;
  password: string;
  plz: string;
  street: string;
  phone: string;
  displayName: string;
  createdAt?: Date;
}

interface Message {
  id: string;
  subject: string;
  text: string;
  createdAt?: Date;
}

function toDateSafe(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  // @ts-expect-error runtime check
  if (typeof value === "object" && typeof value?.seconds === "number") {
    // @ts-expect-error runtime check
    return new Timestamp(value.seconds, value.nanoseconds ?? 0).toDate();
  }
  return undefined;
}

const emptyProfile = (email: string): UserProfile => ({
  id: "",
  email,
  displayName: "",
  age: "",
  city: "",
  country: "",
  gender: "",
  password: "",
  phone: "",
  plz: "",
  street: "",
  createdAt: undefined,
});

export default function Profile() {
  // ✅ ALL HOOKS FIRST (no early returns before this point)
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);

  // auth subscription
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setAuthEmail(u?.email ?? null);
    });
    return () => unsub();
  }, []);

  // keep form in sync when profile loads
  useEffect(() => {
    if (userProfile) setForm(userProfile);
    else setForm(null);
  }, [userProfile]);

  // fetch profile + messages by email
  useEffect(() => {
    if (!authEmail) {
      setUserProfile(null);
      setMessages([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchAll = async () => {
      setLoading(true);
      try {
        // ===== USER PROFILE by email =====
        const usersRef = collection(db, "Users");
        const userQ = query(usersRef, where("email", "==", authEmail), limit(1));
        const userSnap = await getDocs(userQ);

        if (cancelled) return;

        if (!userSnap.empty) {
          const d = userSnap.docs[0];
          const data = d.data() as any;

          const profile: UserProfile = {
            id: d.id,
            email: data.email ?? authEmail,
            displayName: data.displayName ?? data.name ?? "", // support both
            age: data.age ?? "",
            city: data.city ?? "",
            country: data.country ?? "",
            gender: data.gender ?? "",
            password: data.password ?? "",
            phone: data.phone ?? "",
            plz: data.plz ?? "",
            street: data.street ?? "",
            createdAt: toDateSafe(data.createdAt),
          };

          setUserProfile(profile);
        } else {
          setUserProfile(emptyProfile(authEmail));
        }

        // ===== MESSAGES by email =====
        const messagesRef = collection(db, "Messages");

        // NOTE: you used "em", "sub", "mes" fields — keeping that.
        // If you created the composite index, you can re-add orderBy.
        const msgQ = query(messagesRef, where("em", "==", authEmail));
        const msgSnap = await getDocs(msgQ);

        if (cancelled) return;

        const msgs: Message[] = msgSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            subject: String(data.sub ?? ""),
            text: String(data.mes ?? ""),
            createdAt: toDateSafe(data.createdAt),
          };
        });

        // sort locally (newest first) to avoid needing composite index
        msgs.sort((a, b) => {
          const ta = a.createdAt?.getTime() ?? 0;
          const tb = b.createdAt?.getTime() ?? 0;
          return tb - ta;
        });

        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching profile/messages:", error);
        if (!cancelled) {
          setUserProfile(null);
          setMessages([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [authEmail]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!form) return;
    const { name, value } = e.target;

    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value } as UserProfile;
    });
  }

  const Input = useMemo(
    () =>
      function InputInner({
        label,
        name,
        disabled = false,
        type = "text",
      }: {
        label: string;
        name: keyof UserProfile;
        disabled?: boolean;
        type?: string;
      }) {
        return (
          <div className="Input-Profile">
            <label>{label}</label>
            <input
              type={type}
              name={String(name)}
              disabled={disabled}
              value={(form as any)?.[name] ?? ""}
              onChange={handleChange}
              
            />
          </div>
        );
      },
    [form]
  );
  function returnHome(){
    const base = import.meta.env.BASE_URL;
    window.location.href = base;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form || !userProfile?.id) return;

    // Don't allow editing createdAt or doc id.
    // Also: do not store password in Firestore (leaving it excluded like you asked)
    const { createdAt, id, password, ...safeData } = form;

    try {
      setSaving(true);
      await updateDoc(doc(db, "Users", userProfile.id), {
        ...safeData,
        // keep displayName consistent in DB:
        displayName: safeData.displayName ?? "",
      });
      alert("Profile updated");

      // refresh local profile state so UI shows saved values
      setUserProfile((p) => (p ? { ...p, ...safeData } : p));
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  // ✅ NOW early returns are safe (after all hooks)
  if (loading) return <div className="p-8">Loading...</div>;

  if (!authEmail) {
    return (
      <div className="Error-profile">
        <h1>Profile</h1>
        <p>You are not logged in.</p>
        <button onClick={returnHome}>Return Home</button>
      </div>
    );
  }

  return (
    <Fragment>
        <Header/>
      <section>
        <h2>Profile</h2>
        {userProfile && (
          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >

            <Input label="Name" name="displayName" />
            <Input label="Email" name="email" disabled />
            <Input label="Phone" name="phone" />
            <Input label="Age" name="age" />
            <Input label="Gender" name="gender" />

            <Input label="Street" name="street" />
            <Input label="PLZ" name="plz" />
            <Input label="City" name="city" />
            <Input label="Country" name="country" />

            <hr className="my-4" />


            {userProfile.createdAt && (
              <p className="text-sm text-gray-600 pt-2">
                Joined: {userProfile.createdAt.toLocaleDateString()}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        )}
      </section>

      <section>
        <h2 className="page-title">Messages ({messages.length})</h2>

        <div>
          {messages.map((msg) => (
            <div key={msg.id} className="education-box">
              <h3>{msg.subject}</h3>
              <h4>{msg.text}</h4>
              <p>{msg.createdAt ? msg.createdAt.toLocaleDateString() : ""}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </Fragment>
  );
}
