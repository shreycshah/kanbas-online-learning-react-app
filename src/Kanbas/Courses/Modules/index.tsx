import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const removeModule = async (moduleId: string) => {
    console.log("Removing module in index.tsx", moduleId);
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    console.log("Module created", module);
    dispatch(addModule(module));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  return (
    <div className="flex-fill" style={{ color: 'black' }}>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary" style={{ color: 'black', border: '1px solid black' }}>
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <input className="form-control w-50 d-inline-block"
                  onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name} />
              )} <ModuleControlButtons moduleId={module._id}
                deleteModule={() => removeModule(module._id)}
                editModule={(moduleId) => dispatch(editModule(moduleId))} />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1" style={{ color: 'black', border: '1px solid black' }}>
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name} <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}
