import { useEffect, useState, useRef } from 'react'


// Modal (dialog) bileşeni oluşturacağız ve isOpen state değişkeni true olduğunda modal açılacak.
// Görevler:
// 1. Modal bileşenini yalnızca isOpen true olduğunda görünür hale getirin.
//    - Modal kapatıldığında, isOpen state'i false olarak güncellenmeli ve modal gizlenmelidir.
// 2. Kullanıcı, modal dışında bir yere tıkladığında modal kapatılmalıdır (onClick ile bu durumu yönetin).
// 3. "Modal açık" başlığını dinamik hale getirin ve açılan modalın içeriğinin props ile özelleştirilmesine izin verin.
// 4. Modal kapatıldığında veya açıldığında konsola bir mesaj yazdırın ("Modal açıldı" veya "Modal kapatıldı").

// Bonus:
// - Modal açıldığında escape tuşuna basılarak modalın kapatılabilmesini sağlayın.
// - Modal açıldığında arka planı karartarak kullanıcı dikkatini modala odaklayın (yarı saydam bir siyah katman ekleyin).
// - Modal ekran boyutlarına göre responsive olacak şekilde tasarlanmalıdır (mobil cihazlar için daha küçük bir boyut, geniş ekranlar için daha büyük bir boyut).
// - Kullanıcı modal açıkken sayfayı kaydırmayı engelleyin.

// Tailwind ile ilgili istekler:
// 1. Modal çerçevesine ve içeriğine gölge ekleyin (shadow-lg) ve daha belirgin tasarım sağlayın.
// 2. Modal açıkken "Kapalı" butonuna hover veya focus durumlarında görsel geri bildirim sağlayın (arka plan rengini veya gölgeyi değiştirin).
// 3. Arka plan karartma efekti için Tailwind kullanarak yarı saydam bir siyah katman (bg-black/50) ekleyin.
// 4. Mobil cihazlarda modalın kenarlıklarının ekrana taşmamasını sağlayacak iç kenar boşlukları (p-4) ekleyin.
// 5. Modal içeriğini ve kapat butonunu, özellikle ekran okuyucular (screen readers) için erişilebilir hale getirin (aria-labelledby ve aria-hidden gibi erişilebilirlik özniteliklerini kullanın).

export default function App() {
  const [isOpen, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Modali Aç
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Modal açık">
        <p className="text-gray-700">Bu modal içeriği props ile özelleştirilebilir.</p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md"
        >
          Kapalı
        </button>
      </Modal>
    </>
  )
}

function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      console.log('Modal açıldı')
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      console.log('Modal kapatıldı')
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 sm:p-8"
        aria-hidden="false"
      >
        {title && (
          <h2 id="modal-title" className="text-xl font-bold mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}

// function Modal({ children }) {
//   // ref.showModal()
//   return <dialog className='border-2 border-black p-4'>{children}</dialog>
// }
