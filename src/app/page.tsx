"use client";
import { useEffect, useState } from "react";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: string;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    const res = await fetch("/api/students");
    setStudents(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(editingId ? `/api/students/${editingId}` : "/api/students", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ firstName: "", lastName: "", email: "" });
    setEditingId(null);
    load();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Students CRUD</h1>

      <form onSubmit={submit} className="mb-6 flex gap-2">
        <input className="border p-2 flex-1" placeholder="First Name"
          value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <input className="border p-2 flex-1" placeholder="Last Name"
          value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <input className="border p-2 flex-1" placeholder="Email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button className="bg-black text-white px-4 py-2 rounded">{editingId ? "Update" : "Add"}</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.firstName} {s.lastName}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">
                <button onClick={() => { setEditingId(s.id); setForm({ firstName: s.firstName, lastName: s.lastName, email: s.email }); }} className="text-blue-600 mr-2">Edit</button>
                <button onClick={async () => { await fetch(`/api/students/${s.id}`, { method: "DELETE" }); load(); }} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
