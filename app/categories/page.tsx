const Categories = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
      <p className="w-full relative text-2xl inline-block font-arial text-midnightblue text-center">Categories</p>
      <Image src="/images/filter.svg" className="w-full relative rounded-[62px] max-w-full overflow-hidden h-8" width={32} height={32} sizes="100vw" alt="" />
      </div>
    </div>
  )
}

export default Categories