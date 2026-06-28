import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">SOLE</h3>
            <p className="text-muted-foreground text-sm">
              Giày chất lượng cao cho mọi phong cách sống. Khám phá các sneaker và giày thể thao mới nhất từ các thương hiệu hàng đầu.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Cửa Hàng</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">
                  Tất Cả Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/shop?category=running" className="hover:text-accent transition-colors">
                  Chạy Bộ
                </Link>
              </li>
              <li>
                <Link href="/shop?category=basketball" className="hover:text-accent transition-colors">
                  Bóng Rổ
                </Link>
              </li>
              <li>
                <Link href="/shop?category=casual" className="hover:text-accent transition-colors">
                  Dạo Phố
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Công Ty</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Tuyển Dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Thông Tin Vận Chuyển
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Trả Lại Hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SOLE. Bảo lưu tất cả các quyền. Được tạo bằng v0.</p>
        </div>
      </div>
    </footer>
  );
}
