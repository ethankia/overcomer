const dbUrl = "https://overcome-your-sins-db-default-rtdb.firebaseio.com/";

document.getElementById('journeyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const startDate = document.getElementById('start-date').value;
  const sin = document.getElementById('sin').value;
  localStorage.setItem('startDate', startDate);
  localStorage.setItem('sin', sin);
  updateProgress();
});

function updateProgress() {
  const startDate = new Date(localStorage.getItem('startDate'));
  if (!startDate) return;
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById('daysCount').textContent = `You've been overcoming ${localStorage.getItem('sin')} for ${diffDays} day(s).`;
  document.getElementById('progressFill').style.width = Math.min(diffDays * 3, 100) + '%';
  document.getElementById('progressSection').classList.remove('hidden');
}

const verses = [
  "1 Corinthians 10:13 – No temptation has overtaken you...",
  "James 4:7 – Submit yourselves to God. Resist the devil...",
  "Philippians 4:13 – I can do all things through Christ...",
  "Psalm 51:10 – Create in me a clean heart, O God...",
  "James 1:12 – Blessed is the one who perseveres under trial..."
];

function showVerse() {
  const verse = verses[Math.floor(Math.random() * verses.length)];
  document.getElementById('verseDisplay').textContent = verse;
}

function saveJournal() {
  const entry = document.getElementById('journalEntry').value;
  const timestamp = new Date().toISOString();
  fetch(dbUrl + "/journal.json", {
    method: "POST",
    body: JSON.stringify({ entry, timestamp }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => {
    document.getElementById('journalStatus').textContent = "Prayer saved 🙏";
    document.getElementById('journalEntry').value = "";
  }).catch(() => {
    document.getElementById('journalStatus').textContent = "Failed to save.";
  });
}

window.onload = updateProgress;
