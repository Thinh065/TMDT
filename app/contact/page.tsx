import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên Hệ - SOLE',
  description: 'Liên hệ với SOLE để được tư vấn, hỗ trợ đơn hàng, khiếu nại hoặc hợp tác kinh doanh.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section className="text-center">
        <p className="text-accent font-semibold uppercase tracking-[0.3em] mb-4">Liên Hệ</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Chúng tôi luôn sẵn sàng hỗ trợ bạn</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Nếu bạn cần trợ giúp về đơn hàng, tìm kiếm sản phẩm, phản hồi dịch vụ hoặc hợp tác, hãy liên hệ với đội ngũ chăm sóc khách hàng của SOLE.
        </p>
      </section>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Hỗ trợ khách hàng</h2>
          <p className="text-muted-foreground mb-4">
            Thời gian làm việc: 8:00 - 21:00 mỗi ngày, bao gồm cả Thứ 7 và Chủ nhật.
          </p>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Hotline</p>
              <p className="mt-1">0900 123 456</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p className="mt-1">support@sole-store.com</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Kênh chat</p>
              <p className="mt-1">Chat trực tiếp ngay trên website</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Văn phòng & giao nhận</h2>
          <p className="text-muted-foreground mb-4">
            SOLE luôn nỗ lực giao hàng nhanh chóng và đảm bảo mọi yêu cầu của khách hàng được phản hồi kịp thời.
          </p>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Địa chỉ</p>
              <p className="mt-1">Số 12 Phố Giày, Quận 1, TP. HCM</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Giờ làm việc</p>
              <p className="mt-1">Từ 8:00 đến 21:00 hàng ngày</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Thời gian phản hồi</p>
              <p className="mt-1">Trong vòng 24 giờ làm việc</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Hỗ trợ nhanh</h2>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <p className="font-medium text-foreground">Hỗ trợ đổi/trả</p>
              <p className="mt-1">Liên hệ hotline hoặc gửi yêu cầu qua email để được hướng dẫn chi tiết.</p>
            </li>
            <li>
              <p className="font-medium text-foreground">Theo dõi đơn hàng</p>
              <p className="mt-1">Cung cấp mã đơn hàng để tra cứu trạng thái nhanh chóng.</p>
            </li>
            <li>
              <p className="font-medium text-foreground">Phản hồi sản phẩm</p>
              <p className="mt-1">Chia sẻ cảm nhận để chúng tôi cải thiện trải nghiệm mua sắm.</p>
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">Gửi yêu cầu ngay</h2>
            <p className="text-muted-foreground mb-6">
              Điền thông tin dưới đây để nhận phản hồi nhanh từ đội ngũ SOLE. Mọi thông tin của bạn sẽ được bảo mật và chỉ sử dụng để hỗ trợ yêu cầu.
            </p>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@sole-store.com"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nội dung yêu cầu</label>
                <textarea
                  rows={5}
                  placeholder="Cho chúng tôi biết bạn cần hỗ trợ gì"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent/90"
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Có câu hỏi ngay?</h3>
              <p>
                Hãy gọi đến số hotline hoặc gửi email để được hỗ trợ ngay lập tức. Nếu bạn cần hỗ trợ sau giờ hành chính, chúng tôi vẫn trả lời email trong vòng 24 giờ làm việc.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Hợp tác phát triển</h3>
              <p>
                Nếu bạn muốn hợp tác với SOLE hoặc giới thiệu sản phẩm mới, vui lòng liên hệ với bộ phận kinh doanh để nhận tư vấn chuyên sâu.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Gặp trực tiếp</h3>
              <p>
                Địa chỉ showroom và văn phòng: Số 12 Phố Giày, Quận 1, TP. Hồ Chí Minh. Mở cửa cả tuần để phục vụ khách hàng đến trải nghiệm trực tiếp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
