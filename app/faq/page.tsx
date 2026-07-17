import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Câu Hỏi Thường Gặp - SOLE',
  description: 'Tập hợp các câu hỏi thường gặp về đặt hàng, vận chuyển, đổi trả và tài khoản tại SOLE.',
};

const faqItems = [
  {
    question: 'Làm cách nào để đặt hàng trên SOLE?',
    answer:
      'Chọn sản phẩm bạn yêu thích, thêm vào giỏ hàng, điền thông tin giao hàng và thanh toán. Bạn sẽ nhận được email xác nhận ngay sau khi hoàn tất.',
  },
  {
    question: 'SOLE có nhiều phương thức thanh toán không?',
    answer:
      'Chúng tôi hỗ trợ thanh toán qua thẻ nội địa, thẻ quốc tế, ví điện tử Momo/ZaloPay và thanh toán khi nhận hàng tại một số khu vực.',
  },
  {
    question: 'Bao lâu thì đơn hàng được giao?',
    answer:
      'Thông thường trong 1-3 ngày làm việc với khu vực nội thành và 2-5 ngày làm việc với tỉnh thành khác. Bạn có thể xem chi tiết trong mục Thông Tin Vận Chuyển.',
  },
  {
    question: 'SOLE có chính sách đổi trả như thế nào?',
    answer:
      'Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm còn nguyên vẹn, chưa sử dụng và có đầy đủ nhãn mác. Xem thêm Chính Sách Trả Lại Hàng để biết chi tiết.',
  },
  {
    question: 'Làm sao kiểm tra tình trạng đơn hàng?',
    answer:
      'Bạn có thể kiểm tra trong mục tài khoản hoặc liên hệ hotline để cung cấp mã đơn hàng và nhận thông tin cập nhật nhanh nhất.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section className="text-center">
        <p className="text-accent font-semibold uppercase tracking-[0.3em] mb-4">Câu Hỏi Thường Gặp</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Những thắc mắc phổ biến được giải đáp</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Dành cho những người muốn mua sắm nhanh, an tâm và không lo lắng về quy trình đặt hàng, vận chuyển, đổi trả hoặc tài khoản.
        </p>
      </section>

      <div className="mt-16 space-y-6">
        {faqItems.map((item) => (
          <div key={item.question} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-3">{item.question}</h2>
            <p className="text-muted-foreground leading-8">{item.answer}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-3xl border border-border bg-card p-10 shadow-sm">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Chưa tìm thấy câu trả lời?</h2>
        <p className="text-muted-foreground mb-6">
          Nếu bạn cần hỗ trợ thêm, hãy truy cập trang Liên Hệ để gửi yêu cầu hoặc gọi hotline. Đội ngũ SOLE luôn sẵn sàng tư vấn chi tiết cho bạn.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-6">
            <p className="font-semibold text-foreground mb-2">Hỗ trợ đặt hàng</p>
            <p className="text-sm text-muted-foreground">Giúp bạn hoàn tất đơn và chọn size phù hợp.</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-6">
            <p className="font-semibold text-foreground mb-2">Vấn đề thanh toán</p>
            <p className="text-sm text-muted-foreground">Giải quyết lỗi giao dịch và xác nhận đơn hàng.</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-6">
            <p className="font-semibold text-foreground mb-2">Theo dõi giao hàng</p>
            <p className="text-sm text-muted-foreground">Xem trạng thái đơn hàng và hành trình vận chuyển.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
