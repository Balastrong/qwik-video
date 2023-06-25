import { component$ } from "@builder.io/qwik";
import { useLocation, routeLoader$, Link } from "@builder.io/qwik-city";
import type { paths } from "@octokit/openapi-types";

type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export const useRepository = routeLoader$(async ({ params }) => {
  const user = params.user;
  const repo = params.repo;

  const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
    headers: {
      "User-Agent": "Qwik Workshop",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const repository = (await response.json()) as OrgRepoResponse;
  return repository;
});

export default component$(() => {
  const repository = useRepository();
  const location = useLocation();
  return (
    <div>
      <h1>
        Repository:{" "}
        <Link href={"/github/" + location.params.user}>
          {location.params.user}
        </Link>
        /{location.params.repo}
      </h1>
      <div>
        <b>Repo:</b> {repository.value.name}
      </div>
      <div>
        <b>Description:</b> {repository.value.description}
      </div>
    </div>
  );
});
