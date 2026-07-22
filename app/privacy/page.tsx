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
  title: 'Chính Sách Bảo Mật - SOLE',
  description: 'SOLE cam kết bảo mật thông tin khách hàng, tôn trọng quyền riêng tư và sử dụng dữ liệu minh bạch.',
};

export default function PrivacyPage() {
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
              <BreadcrumbPage>Chính Sách Bảo Mật</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="text-center">
        <p className="text-accent font-semibold uppercase tracking-[0.3em] mb-4">Chính Sách Bảo Mật</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Bảo vệ thông tin của bạn là ưu tiên hàng đầu</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          SOLE cam kết thu thập và sử dụng dữ liệu cá nhân theo cách an toàn, minh bạch và chỉ phục vụ cho mục đích cải thiện trải nghiệm mua sắm.
        </p>
      </section>

      <div className="mt-16 space-y-12">
        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Dữ liệu chúng tôi thu thập</h2>
          <ul className="space-y-4 text-muted-foreground text-sm leading-7">
            <li>Thông tin liên hệ: tên, email, số điện thoại.</li>
            <li>Thông tin giao hàng: địa chỉ, mã bưu chính, yêu cầu đặc biệt.</li>
            <li>Thông tin đơn hàng: sản phẩm đã mua, lịch sử giao dịch, trạng thái đơn.</li>
            <li>Dữ liệu truy cập trang: địa chỉ IP, trình duyệt, thiết bị và hành vi mua sắm trên website.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Cách chúng tôi sử dụng dữ liệu</h2>
          <div className="space-y-4 text-muted-foreground text-sm leading-7">
            <p>SOLE sử dụng dữ liệu để xử lý đơn hàng, giao hàng, liên hệ xác nhận và hỗ trợ khách hàng khi cần.</p>
            <p>Dữ liệu còn giúp chúng tôi cá nhân hóa trải nghiệm mua sắm, gửi thông tin khuyến mãi phù hợp và nâng cao chất lượng dịch vụ.</p>
            <p>Chúng tôi không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba không có thỏa thuận hợp tác rõ ràng.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Quyền của bạn</h2>
          <ul className="space-y-4 text-muted-foreground text-sm leading-7">
            <li>Yêu cầu cập nhật, sửa đổi hoặc xóa thông tin cá nhân.</li>
            <li>Rút lại sự đồng ý cho hoạt động tiếp thị qua email bất cứ lúc nào.</li>
            <li>Yêu cầu sao chép dữ liệu cá nhân mà chúng tôi đang lưu trữ về bạn.</li>
          </ul>
          <p className="mt-4">Để thực hiện quyền của bạn, vui lòng liên hệ email: support@sole-store.com.</p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-4">Bảo mật thông tin</h2>
          <p className="text-muted-foreground text-sm leading-7">
            Chúng tôi áp dụng biện pháp bảo mật kỹ thuật và tổ chức phù hợp nhằm ngăn chặn truy cập trái phép, rò rỉ, sửa đổi hoặc phá hủy dữ liệu cá nhân. Các hệ thống thanh toán của SOLE đều tuân thủ tiêu chuẩn bảo mật và mã hóa thông tin khách hàng.
          </p>
        </section>
      </div>
    </div>
  );
}
