import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Trả Lại Hàng - SOLE',
  description: 'SOLE cung cấp chính sách trả lại hàng linh hoạt, minh bạch và tốc độ xử lý nhanh chóng cho khách hàng.',
};

export default function ReturnsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang Chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Trả Lại Hàng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="text-center">
        <p className="text-accent font-semibold uppercase tracking-[0.3em] mb-4">Trả Lại Hàng</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Chính sách đổi trả thuận tiện</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          SOLE cam kết đem lại sự an tâm cho bạn bằng chính sách đổi trả rõ ràng và hỗ trợ kịp thời khi sản phẩm không như ý.
        </p>
      </section>

      <div className="mt-16 space-y-12">
        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Điều kiện trả lại</h2>
          <ul className="space-y-4 text-muted-foreground text-sm leading-7">
            <li>Thời gian đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</li>
            <li>Sản phẩm còn nguyên tem, hộp, nhãn mác và chưa qua sử dụng.</li>
            <li>Giày phải không bị trầy xước, cũ hay dơ bẩn do sử dụng.</li>
            <li>Giữ lại hóa đơn hoặc xác nhận đơn hàng để đối chiếu.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Quy trình trả lại</h2>
          <ol className="list-decimal space-y-4 pl-5 text-muted-foreground text-sm leading-7">
            <li>Liên hệ SOLE qua email hoặc hotline để thông báo lý do trả lại.</li>
            <li>Chuẩn bị sản phẩm trong trạng thái đóng gói cẩn thận và gửi lại theo hướng dẫn.</li>
            <li>SOLE kiểm tra hàng và xác nhận điều kiện trả lại trong vòng 24 giờ làm việc.</li>
            <li>Tiến hành hoàn tiền hoặc đổi sản phẩm mới theo lựa chọn của bạn.</li>
          </ol>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Hoàn tiền và đổi sản phẩm</h2>
          <div className="space-y-4 text-muted-foreground text-sm leading-7">
            <p>SOLE sẽ hoàn tiền về phương thức thanh toán ban đầu trong vòng 3-5 ngày làm việc sau khi xác nhận trả hàng thành công.</p>
            <p>Đổi sản phẩm áp dụng khi còn hàng và được thực hiện trong vòng 5 ngày làm việc kể từ khi đơn trả được duyệt.</p>
            <p>Phí vận chuyển đổi trả có thể do SOLE hỗ trợ hoặc khách hàng chịu, tùy chương trình và nguyên nhân trả hàng.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Lưu ý thêm</h2>
          <ul className="space-y-4 text-muted-foreground text-sm leading-7">
            <li>Sản phẩm giảm giá chỉ được đổi hoặc trả theo chính sách ưu đãi cụ thể, trừ khi lỗi do nhà sản xuất.</li>
            <li>Không nhận trả hàng do khách hàng đặt sai size nếu sản phẩm đã qua sử dụng hoặc không nguyên vẹn.</li>
            <li>Nên giữ lại toàn bộ chứng từ và mã vận đơn để thuận tiện đối chiếu sau này.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
