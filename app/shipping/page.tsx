import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thông Tin Vận Chuyển - SOLE',
  description: 'Thông tin chi tiết về thời gian giao hàng, phí vận chuyển và theo dõi đơn hàng tại SOLE.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section className="text-center">
        <p className="text-accent font-semibold uppercase tracking-[0.3em] mb-4">Thông Tin Vận Chuyển</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Giao hàng nhanh, an tâm theo dõi</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          SOLE hợp tác với đối tác vận chuyển uy tín nhằm đảm bảo đơn hàng của bạn được giao đúng hẹn, an toàn và dễ dàng kiểm tra trạng thái.
        </p>
      </section>

      <div className="mt-16 space-y-12">
        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Thời gian giao hàng</h2>
          <div className="grid gap-6 md:grid-cols-3 text-muted-foreground text-sm leading-7">
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Nội thành</p>
              <p>1-3 ngày làm việc</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Liên tỉnh</p>
              <p>2-5 ngày làm việc</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Khu vực hẻo lánh</p>
              <p>5-7 ngày làm việc</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Phí vận chuyển</h2>
          <p className="text-muted-foreground mb-4 text-sm leading-7">
            Phí vận chuyển được tính theo khu vực và tổng giá trị đơn hàng. SOLE thường ưu đãi miễn phí vận chuyển cho đơn hàng đạt mức tối thiểu hoặc trong chương trình khuyến mãi.
          </p>
          <ul className="space-y-4 text-muted-foreground text-sm leading-7">
            <li>Đơn hàng dưới 1 triệu: phí vận chuyển áp dụng theo bảng giá khu vực.</li>
            <li>Đơn hàng từ 1 triệu trở lên: có thể được miễn phí vận chuyển tùy khuyến mãi.</li>
            <li>Vận chuyển nhanh trong ngày có thể áp dụng thêm phí phụ thu.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Hướng dẫn theo dõi đơn hàng</h2>
          <ol className="list-decimal space-y-4 pl-5 text-muted-foreground text-sm leading-7">
            <li>Kiểm tra email/sms để nhận mã vận đơn sau khi đơn hàng được xử lý.</li>
            <li>Truy cập trang web của đơn vị vận chuyển và nhập mã để kiểm tra hành trình.</li>
            <li>Liên hệ tổng đài SOLE nếu bạn cần hỗ trợ xác nhận lịch giao hoặc thay đổi địa chỉ giao hàng.</li>
          </ol>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Lưu ý khi nhận hàng</h2>
          <ul className="space-y-4 text-muted-foreground text-sm leading-7">
            <li>Kiểm tra kỹ sản phẩm trước khi ký nhận, đảm bảo không bị móp, hư hại hoặc thiếu phụ kiện.</li>
            <li>Ghi nhận ngay khi có dấu hiệu thất lạc hoặc hỏng hóc để chúng tôi giải quyết kịp thời.</li>
            <li>Nếu nhận hàng lúc quá muộn, giữ lại biên lai và thông báo cho SOLE trong vòng 24 giờ.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
