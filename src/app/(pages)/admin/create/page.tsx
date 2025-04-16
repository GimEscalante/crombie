"use client"

import { useEffect, useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

type Category = {
    categoryId: string
    name: string
}
  

export default function CreateProductPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [categoryId, setCategoryId] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!image) {
      alert("La imagen es obligatoria")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", String(price))
    formData.append("categoryId", categoryId)
    formData.append("image", image)

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      router.push("/admin")
    } else {
      alert("Hubo un error al crear el producto")
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Crear nuevo producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="p-2 border rounded"
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
            </option>
            ))}

        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Crear producto
        </button>
      </form>
    </main>
  )
}
