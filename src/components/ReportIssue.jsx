import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Camera, Send, CheckCircle } from 'lucide-react';

const defaultIssues = () => {
  try {
    const raw = localStorage.getItem('civicsense:issues');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const categories = [
  { value: 'litter', label: 'Littering' },
  { value: 'roads', label: 'Pothole / Roads' },
  { value: 'noise', label: 'Noise' },
  { value: 'safety', label: 'Safety Hazard' },
  { value: 'lighting', label: 'Street Lighting' },
];

const ReportIssue = React.forwardRef((props, ref) => {
  const [issues, setIssues] = useState(defaultIssues);
  const [photoPreview, setPhotoPreview] = useState('');
  const [form, setForm] = useState({ category: 'litter', description: '', location: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('civicsense:issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim() || !form.location.trim()) return;
    const newIssue = {
      id: Date.now(),
      ...form,
      photo: photoPreview || null,
      createdAt: new Date().toISOString(),
      status: 'submitted',
    };
    setIssues((prev) => [newIssue, ...prev]);
    setForm({ category: 'litter', description: '', location: '' });
    setPhotoPreview('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1800);
  };

  const stats = useMemo(() => ({
    total: issues.length,
    resolved: issues.filter((i) => i.status === 'resolved').length,
  }), [issues]);

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <Send className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Report a Local Issue</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Briefly describe the issue..."
                className="mt-1 w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Location</label>
              <div className="mt-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Address, landmark, or plus code"
                    className="w-full rounded-lg border-slate-300 pl-9 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                {/* Future enhancement: one-tap locate */}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Photo (optional)</label>
              <div className="mt-1 flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50">
                  <Camera className="h-4 w-4" />
                  <span>Add Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </label>
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Submitted: <span className="font-medium text-slate-700">{stats.total}</span></div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 disabled:opacity-50"
                disabled={!form.description.trim() || !form.location.trim()}
              >
                <Send className="h-4 w-4" /> Submit
              </button>
            </div>
            {submitted && (
              <div className="mt-2 inline-flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" /> Thanks! Your report has been saved locally.
              </div>
            )}
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Reports</h3>
            <span className="text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-600">{issues.length} total</span>
          </div>
          {issues.length === 0 ? (
            <p className="text-slate-500">No reports yet. Be the first to make a difference!</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {issues.map((issue) => (
                <li key={issue.id} className="py-3 flex items-start gap-3">
                  {issue.photo ? (
                    <img src={issue.photo} alt="" className="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-200" />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">#{issue.category.slice(0,1).toUpperCase()}</div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="capitalize font-medium text-slate-700">{categories.find(c=>c.value===issue.category)?.label || issue.category}</span>
                      <span>•</span>
                      <span>{new Date(issue.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-800">{issue.description}</p>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      <span>{issue.location}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
});

export default ReportIssue;
