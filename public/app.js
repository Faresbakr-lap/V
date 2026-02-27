const form = document.getElementById('posts-form');
const postsEl = document.getElementById('posts');
const statusEl = document.getElementById('status');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#c62828' : '#1b5e20';
}

function renderPost(post) {
  const article = document.createElement('article');
  article.className = 'post';

  const date = new Date(post.created_time).toLocaleString('ar-EG');
  article.innerHTML = `<h3>التاريخ: ${date}</h3>`;

  const text = document.createElement('p');
  text.textContent = post.message || 'بدون نص';
  article.appendChild(text);

  if (post.full_picture) {
    const img = document.createElement('img');
    img.src = post.full_picture;
    img.alt = 'صورة المنشور';
    article.appendChild(img);
  }

  const attachment = post.attachments?.data?.[0];
  const attachmentType = attachment?.media_type || attachment?.type;

  const videoSrc =
    attachment?.media?.source ||
    attachment?.media?.image?.src ||
    attachment?.unshimmed_url ||
    attachment?.url;

  if (attachmentType?.includes('video') && videoSrc) {
    const video = document.createElement('video');
    video.controls = true;
    video.src = videoSrc;
    article.appendChild(video);
  }

  return article;
}

async function loadPosts(pageId, accessToken) {
  setStatus('جاري تحميل المنشورات...');
  postsEl.innerHTML = '';

  const response = await fetch(
    `/api/posts?pageId=${encodeURIComponent(pageId)}&accessToken=${encodeURIComponent(accessToken)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'حدث خطأ أثناء جلب المنشورات');
  }

  if (!data.posts?.length) {
    setStatus('لا توجد منشورات متاحة حالياً.');
    return;
  }

  setStatus(`تم تحميل ${data.posts.length} منشور.`);

  data.posts.forEach((post) => {
    postsEl.appendChild(renderPost(post));
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const pageId = document.getElementById('page-id').value.trim();
  const accessToken = document.getElementById('access-token').value.trim();

  if (!pageId || !accessToken) {
    setStatus('من فضلك أدخل Page ID و Access Token.', true);
    return;
  }

  try {
    await loadPosts(pageId, accessToken);
  } catch (error) {
    setStatus(error.message, true);
  }
});
