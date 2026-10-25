import { useState, useEffect } from "react";
import { TimetableModal } from "./TimetableModal";

export function openTimetable(
  tab?: "viva" | "remedial" | "faculty" | "mst",
  classGroup?: 1 | 2 | 3 | 4 | 5
) {
  window.dispatchEvent(
    new CustomEvent("itm_open_timetable", {
      detail: { tab: tab || "viva", classGroup: classGroup || 1 },
    })
  );
}

export function GlobalTimetableModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"viva" | "remedial" | "faculty" | "mst">("viva");
  const [classGroup, setClassGroup] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{
        tab?: "viva" | "remedial" | "faculty" | "mst";
        classGroup?: 1 | 2 | 3 | 4 | 5;
      }>;
      if (customEvent.detail) {
        if (customEvent.detail.tab) setTab(customEvent.detail.tab);
        if (customEvent.detail.classGroup) setClassGroup(customEvent.detail.classGroup);
      }
      setIsOpen(true);
    };

    window.addEventListener("itm_open_timetable", handleOpen);
    return () => window.removeEventListener("itm_open_timetable", handleOpen);
  }, []);

  return (
    <TimetableModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      initialTab={tab}
      initialClass={classGroup}
    />
  );
}
