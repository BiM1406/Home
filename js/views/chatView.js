/**
 * Direct 1-1 Chat View Module (Tin Nhắn Trực Tiếp & Bảo Mật PII Số Điện Thoại)
 * Realtime Simulation with Automatic Phone Masking, Conversation Threads & Quick Prompts
 */
import { AuthService } from '../services/auth.js';
import { Store } from '../services/store.js';
import { generateSvgAvatar } from '../data/mockData.js';

export function renderChatView(container) {
  const currentUser = AuthService.getCurrentUser();

  // Mock Conversations Thread Data
  const threads = [
    {
      id: 'thread-01',
      landlordName: 'Trần Văn B',
      landlordAvatar: generateSvgAvatar('Trần Văn B', '#1a237e', '#ffffff'),
      propertyTitle: 'Biệt Thự Nghỉ Dưỡng Sơn Trà',
      propertyId: 'villa-01',
      isOnline: true,
      lastTime: '10:42',
      messages: [
        {
          sender: 'landlord',
          text: 'Chào bạn! Mình là B - chủ nhà căn Biệt Thự Sơn Trà. Bạn đang quan tâm đến biệt thự này đúng không ạ?',
          time: '10:30'
        },
        {
          sender: 'renter',
          text: 'Chào anh B, em muốn hỏi phòng này cuối tuần có thể ghé xem trực tiếp được không ạ?',
          time: '10:35'
        },
        {
          sender: 'landlord',
          text: 'Được chứ bạn ơi, thứ Bảy hoặc Chủ Nhật lúc nào tiện thì bạn cứ bấm nút Đặt Lịch Hẹn phía trên nhé!',
          time: '10:42'
        }
      ]
    },
    {
      id: 'thread-02',
      landlordName: 'Lê Thị C',
      landlordAvatar: generateSvgAvatar('Lê Thị C', '#2e7d32', '#ffffff'),
      propertyTitle: 'Căn Hộ Duplex Landmark 81',
      propertyId: 'apt-01',
      isOnline: true,
      lastTime: 'Hôm qua',
      messages: [
        {
          sender: 'landlord',
          text: 'Dạ chào bạn, căn hộ Landmark 81 tầng 38 view sông Sài Gòn vẫn đang sẵn sàng cho thuê ạ.',
          time: '16:15'
        }
      ]
    },
    {
      id: 'thread-03',
      landlordName: 'Phạm Văn D',
      landlordAvatar: generateSvgAvatar('Phạm Văn D', '#c36e22', '#ffffff'),
      propertyTitle: 'Studio Dịch Vụ Cầu Giấy',
      propertyId: 'room-01',
      isOnline: false,
      lastTime: '12/08',
      messages: [
        {
          sender: 'landlord',
          text: 'Chào em, phòng trọ gác lửng Cầu Giấy full nội thất giá 4.2tr/tháng em nhé.',
          time: '09:00'
        }
      ]
    }
  ];

  let activeThreadId = 'thread-01';

  /**
   * PII Protection Function: Mask Phone Numbers
   * Converts 0901234567 or 090 123 4567 into 0901***567
   */
  function maskPII(text) {
    // Regex for Vietnamese phone numbers (with or without spaces/dots)
    const phoneRegex = /(0[3|5|7|8|9])([0-9\s.-]{2,3})([0-9\s.-]{2,3})([0-9]{3})/g;
    
    return text.replace(phoneRegex, (match, p1, p2, p3, p4) => {
      return `${p1}***${p4} <span class="pii-masked-tag">[BẢO MẬT PII]</span>`;
    });
  }

  function render() {
    const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

    container.innerHTML = `
      <div class="chat-page-wrapper">
        <div class="chat-app-container">
          <div class="chat-layout-box">
            
            <!-- Left Sidebar: Threads List -->
            <aside class="chat-sidebar-threads">
              <div class="threads-header-search">
                <input 
                  type="text" 
                  id="search-threads-input" 
                  class="threads-search-input" 
                  placeholder="Tìm cuộc hội thoại, chủ nhà..." 
                />
              </div>

              <div class="threads-list-scroll" id="threads-list">
                ${threads.map(t => {
                  const lastMsg = t.messages[t.messages.length - 1];
                  const previewText = lastMsg ? lastMsg.text.replace(/<[^>]*>?/gm, '').slice(0, 32) + '...' : 'Chưa có tin nhắn';

                  return `
                    <div class="thread-item-row ${t.id === activeThreadId ? 'active' : ''}" data-thread-id="${t.id}">
                      <div class="thread-avatar-wrap">
                        <img src="${t.landlordAvatar}" alt="${t.landlordName}" />
                        ${t.isOnline ? '<div class="online-dot"></div>' : ''}
                      </div>
                      <div class="thread-info-wrap">
                        <div class="thread-name-line">
                          <span class="thread-user-name">${t.landlordName}</span>
                          <span class="thread-time-label">${t.lastTime}</span>
                        </div>
                        <div class="thread-preview-line">
                          <span class="thread-last-msg">${previewText}</span>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </aside>

            <!-- Right Area: Active Chat Stream -->
            <main class="chat-main-stream">
              
              <!-- Chat Stream Header -->
              <header class="chat-stream-header">
                <div class="chat-header-user">
                  <div class="thread-avatar-wrap" style="width: 44px; height: 44px;">
                    <img src="${activeThread.landlordAvatar}" alt="${activeThread.landlordName}" />
                    ${activeThread.isOnline ? '<div class="online-dot"></div>' : ''}
                  </div>
                  <div>
                    <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-main); display: flex; align-items: center; gap: 0.4rem;">
                      <span>${activeThread.landlordName}</span>
                      <span class="badge badge-verified" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">✓ Chính Chủ</span>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                      Bất động sản: <strong style="color: var(--accent);">${activeThread.propertyTitle}</strong>
                    </div>
                  </div>
                </div>

                <div class="chat-header-actions">
                  <a href="#/detail?id=${activeThread.propertyId}" class="btn btn-outline" style="padding: 0.45rem 1rem; font-size: 0.82rem;" title="Xem chi tiết phòng">
                    Xem Phòng
                  </a>
                  <a href="#/contract?propertyId=${activeThread.propertyId}" class="btn btn-accent" style="padding: 0.45rem 1.1rem; font-size: 0.82rem;" title="Tạo hợp đồng điện tử">
                    Ký Hợp Đồng
                  </a>
                </div>
              </header>

              <!-- PII Safety Warning Banner -->
              <div class="pii-safety-banner">
                <span><strong>Bảo mật thông tin PII:</strong> Hệ thống tự động che số điện thoại riêng tư để phòng chống lừa đảo môi giới trước khi hợp đồng được ký.</span>
              </div>

              <!-- Message Feed Scroll Box -->
              <div class="chat-messages-feed" id="chat-messages-feed">
                ${activeThread.messages.map(m => `
                  <div class="chat-message-row ${m.sender === 'renter' ? 'sent' : 'received'}">
                    <div class="message-bubble">
                      ${maskPII(m.text)}
                    </div>
                    <span class="message-time-meta">${m.time}</span>
                  </div>
                `).join('')}

                <!-- Typing indicator -->
                <div class="typing-indicator-row" id="typing-indicator">
                  <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600; margin-right: 0.25rem;">${activeThread.landlordName} đang soạn tin</span>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                </div>
              </div>

              <!-- Quick Suggestion Chips -->
              <div class="chat-quick-suggestions">
                <button class="quick-chip-btn" data-suggest="Chào anh/chị, phòng này cuối tuần em có thể qua xem trực tiếp được không ạ?">
                  Hẹn xem phòng cuối tuần
                </button>
                <button class="quick-chip-btn" data-suggest="Cho em hỏi chi phí tiền điện, nước và phí dịch vụ hàng tháng tính thế nào ạ?">
                  Hỏi tiền điện nước & dịch vụ
                </button>
                <button class="quick-chip-btn" data-suggest="Em rất ưng ý căn này, em muốn tạo hợp đồng điện tử để cọc giữ chỗ ngay được không ạ?">
                  Tạo hợp đồng thuê ngay
                </button>
                <button class="quick-chip-btn" data-suggest="Số điện thoại liên hệ của em là 0912345678, anh gọi giúp em nhé!">
                  Thử gửi số điện thoại (Test PII)
                </button>
              </div>

              <!-- Chat Input Bar -->
              <form class="chat-input-toolbar" id="chat-form">
                <input 
                  type="text" 
                  id="chat-input-text" 
                  class="chat-text-input" 
                  placeholder="Nhập tin nhắn... (Hệ thống tự động bảo vệ số điện thoại PII)" 
                  autocomplete="off"
                />
                <button type="submit" class="btn btn-accent" style="padding: 0.75rem 1.6rem;">
                  <span>Gửi &rsaquo;</span>
                </button>
              </form>

            </main>

          </div>
        </div>
      </div>
    `;

    attachChatEvents();
    scrollToBottom();
  }

  function scrollToBottom() {
    const feed = document.getElementById('chat-messages-feed');
    if (feed) {
      feed.scrollTop = feed.scrollHeight;
    }
  }

  function attachChatEvents() {
    const activeThread = threads.find(t => t.id === activeThreadId);

    // 1. Thread Switching
    container.querySelectorAll('.thread-item-row').forEach(row => {
      row.addEventListener('click', () => {
        activeThreadId = row.dataset.threadId;
        render();
      });
    });

    // 2. Quick Suggestion Chips
    container.querySelectorAll('.quick-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById('chat-input-text');
        if (input) {
          input.value = btn.dataset.suggest;
          input.focus();
        }
      });
    });

    // 3. Send Message Form
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input-text');

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Append renter message
        activeThread.messages.push({
          sender: 'renter',
          text: text,
          time: timeStr
        });

        input.value = '';
        render();

        // Trigger realistic Landlord Auto-Reply
        simulateLandlordReply(activeThread, text);
      });
    }
  }

  function simulateLandlordReply(thread, userMessage) {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      setTimeout(() => {
        typingIndicator.style.display = 'inline-flex';
        scrollToBottom();
      }, 500);
    }

    setTimeout(() => {
      let replyText = 'Dạ chào bạn, mình đã nhận được tin nhắn. Bất động sản này hiện vẫn đang còn trống và sẵn sàng bàn giao ngay, bạn cần thêm thông tin gì cứ nhắn mình nhé!';

      const lower = userMessage.toLowerCase();
      if (lower.includes('hẹn') || lower.includes('xem phòng') || lower.includes('cuối tuần')) {
        replyText = 'Dạ rất sẵn lòng! Cuối tuần này thứ Bảy hoặc Chủ Nhật lúc nào bạn tiện cứ qua nhé, bạn bấm nút "Đặt Lịch Hẹn" phía trên để mình giữ lịch tiếp đón chu đáo nha!';
      } else if (lower.includes('điện') || lower.includes('nước') || lower.includes('phí')) {
        replyText = 'Dạ tiền điện tính theo công tơ 3.500đ/kWh, nước 25.000đ/m³, phí dịch vụ wifi và dọn vệ sinh hành lang được miễn phí hoàn toàn ạ.';
      } else if (lower.includes('hợp đồng') || lower.includes('cọc') || lower.includes('thuê ngay')) {
        replyText = 'Tuyệt vời ạ! Bạn hãy bấm nút "📝 Ký Hợp Đồng" ở góc trên bên phải màn hình để tạo hợp đồng điện tử và ký online ngay lập tức nhé!';
      } else if (lower.includes('09') || lower.includes('số điện thoại') || lower.includes('sđt')) {
        replyText = 'Cảm ơn bạn! Để đảm bảo an toàn và quyền lợi đôi bên, mọi trao đổi và hợp đồng chúng ta thực hiện trực tiếp trên RoomRent để được pháp lý bảo hộ 100% bạn nhé!';
      }

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      thread.messages.push({
        sender: 'landlord',
        text: replyText,
        time: timeStr
      });

      render();
    }, 1700);
  }

  render();
}
