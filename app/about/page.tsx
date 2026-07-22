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
  title: 'Giới Thiệu - SOLE',
  description: 'Tìm hiểu về hành trình, giá trị và cam kết của SOLE trong việc cung cấp giày sneaker và giày thể thao chất lượng cao.',
};

export default function AboutPage() {
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
              <BreadcrumbPage>Giới Thiệu</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="text-center">
        <p className="text-accent font-semibold uppercase tracking-[0.3em] mb-4">Giới Thiệu</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">SOLE - Nơi cảm hứng và phong cách gặp nhau</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          SOLE được xây dựng cho những người yêu giày và phong cách sống năng động. Chúng tôi chọn lựa những đôi sneaker chất lượng, cập nhật xu hướng mới và luôn đặt trải nghiệm khách hàng lên hàng đầu.
        </p>
      </section>

      <div className="mt-16 space-y-16">
        <section className="grid gap-10 lg:grid-cols-2 items-center rounded-3xl border border-border bg-card p-10 shadow-sm">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="text-muted-foreground leading-8">
              Mang đến cho khách hàng những đôi giày chất lượng, phù hợp với từng kiểu hoạt động và phong cách cá nhân. SOLE cam kết hỗ trợ tư vấn tận tâm, giao hàng nhanh và đổi trả linh hoạt.
            </p>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Chất lượng hàng đầu</p>
              <p>Chọn lựa sản phẩm từ những thương hiệu sneaker danh tiếng và kiểm tra kỹ càng trước khi đến tay khách hàng.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Dịch vụ chuyên nghiệp</p>
              <p>Luôn chuẩn bị sẵn sàng giải đáp thắc mắc, hỗ trợ đổi trả và tư vấn size chính xác cho từng khách hàng.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2 items-center rounded-3xl border border-border bg-card p-10 shadow-sm">
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Trải nghiệm mua sắm</p>
              <p>Thiết kế trang web thân thiện, dễ tìm sản phẩm và hỗ trợ mọi bước từ chọn size đến hoàn tất thanh toán.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground mb-2">Giao hàng nhanh</p>
              <p>Phối hợp với đối tác vận chuyển uy tín để đơn hàng đến tay bạn trong thời gian ngắn nhất.</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">Giá trị cốt lõi</h2>
            <p className="text-muted-foreground leading-8">
              Sự tin tưởng của khách hàng là tiêu chí quan trọng nhất. Chúng tôi xây dựng SOLE bằng niềm tin vào dịch vụ minh bạch, sản phẩm chính hãng và chính sách hậu mãi thân thiện.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Đội ngũ của SOLE</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Sản phẩm',
                description: 'Những chuyên viên chọn lựa sản phẩm đảm bảo chất lượng, kiểu dáng và độ bền phù hợp nhu cầu của từng khách hàng.',
              },
              {
                title: 'Dịch vụ khách hàng',
                description: 'Đội ngũ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng lắng nghe và giải quyết mọi thắc mắc.',
              },
              {
                title: 'Vận hành',
                description: 'Bộ phận vận hành đảm bảo đơn hàng được xử lý nhanh chóng, đóng gói cẩn thận và giao đi an toàn.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xl font-semibold text-foreground mb-3">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
