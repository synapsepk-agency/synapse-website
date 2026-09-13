import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categoryLabel, getPost, relatedPosts } from "@/lib/blog";
import { TEAM } from "@/lib/content";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/layout/final-cta";
import { Reveal } from "@/components/layout/reveal";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
import { BlogCard } from "@/components/sections/blog-card";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Blog, Synapse Marketing Agency" }] };
    return {
      meta: pageMeta(`${post.title}, Synapse Marketing Agency`, post.excerpt),
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { post } = Route.useLoaderData();
  const { t } = useI18n();
  const author = TEAM.find((m) => m.id === post.authorId);
  const related = relatedPosts(post.slug, post.category);

  return (
    <>
      <PageHero title={post.title} sub={post.excerpt} bg={post.image} />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{categoryLabel(post.category)}</p>
          <div className="mt-4 flex items-center gap-3">
            {author ? (
              <img src={author.photo} alt="" className="size-10 rounded-full object-cover" />
            ) : null}
            <p className="text-sm text-fg-muted">
              {post.author}
              <span className="text-fg-subtle"> · {post.date}</span>
            </p>
          </div>
          <div className="prose-synapse mt-8 space-y-5 text-[1.02rem] leading-relaxed text-fg-muted">
            {post.body.map((block, i) => (
              <div key={i}>
                {block.heading ? <h2 className="mb-2 font-display text-xl font-semibold text-fg">{block.heading}</h2> : null}
                <p>{block.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button>{t("hero.cta")}</Button>
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
              <Button variant="secondary">{t("nav.letsTalk")}</Button>
            </a>
            <Link to="/blog">
              <Button variant="ghost">{t("blog.back")}</Button>
            </Link>
          </div>
        </Reveal>
      </article>

      {related.length ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl font-semibold">{t("blog.related")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 50} from="scale">
                  <BlogCard post={item} readMore={t("blog.readMore")} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <FinalCta />
    </>
  );
}

