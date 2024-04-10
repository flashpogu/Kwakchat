import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMsg() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-4 w-[200px] bg-gray-300 self-end" />
              <Skeleton className="h-4 w-[250px] bg-gray-300 self-end" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-300" />
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-4 w-[200px] bg-gray-300 self-end" />
              <Skeleton className="h-4 w-[250px] bg-gray-300 self-end" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-300" />
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-4 w-[200px] bg-gray-300 self-end" />
              <Skeleton className="h-4 w-[250px] bg-gray-300 self-end" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-300" />
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-4 w-[200px] bg-gray-300 self-end" />
              <Skeleton className="h-4 w-[250px] bg-gray-300 self-end" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-300" />
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex items-center space-x-4">
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-4 w-[200px] bg-gray-300 self-end" />
              <Skeleton className="h-4 w-[250px] bg-gray-300 self-end" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-300" />
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}
